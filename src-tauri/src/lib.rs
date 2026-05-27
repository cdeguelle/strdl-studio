// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_session(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_session(path: String, content: String) -> Result<(), String> {
    std::fs::write(&path, &content).map_err(|e| e.to_string())
}

fn scan_dir_recursive(path: &std::path::Path, results: &mut Vec<String>) {
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.filter_map(|e| e.ok()) {
            let entry_path = entry.path();
            if entry_path.is_dir() {
                scan_dir_recursive(&entry_path, results);
            } else {
                let ext = entry_path.extension()
                    .and_then(|e| e.to_str())
                    .unwrap_or("")
                    .to_lowercase();
                if ["wav", "mp3", "ogg", "flac", "aiff"].contains(&ext.as_str()) {
                    results.push(entry_path.to_string_lossy().to_string());
                }
            }
        }
    }
}

#[tauri::command]
fn scan_samples(path: String) -> Result<Vec<String>, String> {
    let mut audio_files = Vec::new();
    scan_dir_recursive(std::path::Path::new(&path), &mut audio_files);
    Ok(audio_files)
}

fn get_recent_path(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    let data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    std::fs::create_dir_all(&data_dir).map_err(|e| e.to_string())?;
    Ok(data_dir.join("recent_sessions.json"))
}

#[tauri::command]
fn get_recent_sessions(app: tauri::AppHandle) -> Result<Vec<String>, String> {
    let path = get_recent_path(&app)?;
    if !path.exists() {
        return Ok(vec![]);
    }
    let content = std::fs::read_to_string(&path).map_err(|e| e.to_string())?;
    serde_json::from_str(&content).map_err(|e| e.to_string())
}

#[tauri::command]
fn add_recent_session(app: tauri::AppHandle, path: String) -> Result<(), String> {
    let recent_path = get_recent_path(&app)?;
    let mut sessions: Vec<String> = if recent_path.exists() {
        let content = std::fs::read_to_string(&recent_path).map_err(|e| e.to_string())?;
        serde_json::from_str(&content).map_err(|e| e.to_string())?
    } else {
        vec![]
    };
    sessions.retain(|s| s != &path);
    sessions.insert(0, path);
    sessions.truncate(10);
    let json = serde_json::to_string(&sessions).map_err(|e| e.to_string())?;
    std::fs::write(&recent_path, json).map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![greet, read_session, write_session, scan_samples, get_recent_sessions, add_recent_session])
        .setup(|app| {
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::App("index.html".into()))
                .title("strdl-studio")
                .inner_size(1200.0, 800.0)
                .min_inner_size(800.0, 600.0)
                .initialization_script(
                    "window.AudioContext = new Proxy(window.AudioContext, {
                        construct(target, args) {
                            var ctx = Reflect.construct(target, args);
                            ctx.resume().catch(function() {});
                            return ctx;
                        }
                    });"
                )
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
