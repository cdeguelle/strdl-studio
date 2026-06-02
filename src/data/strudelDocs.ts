// Auto-generated from @strudel/codemirror jsdoc data
export type DocEntry = {
  name: string;
  description: string;
  synonyms: string[];
  examples: string[];
  params: { name: string; type: string; description: string }[];
  file: string;
  superdirtOnly: boolean;
};

export const STRUDEL_DOCS: DocEntry[] = [
  {
    "name": "absoluteOrientationAlpha",
    "description": "<p>The device's absolute orientation alpha value ranges from 0 to 1.</p>",
    "synonyms": [
      "absOriA",
      "absOriZ",
      "absoluteOrientationZ"
    ],
    "examples": [
      "n(absoluteOrientationAlpha.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "absoluteOrientationBeta",
    "description": "<p>The device's absolute orientation beta value ranges from 0 to 1.</p>",
    "synonyms": [
      "absOriB",
      "absOriX",
      "absoluteOrientationX"
    ],
    "examples": [
      "n(absoluteOrientationBeta.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "absoluteOrientationGamma",
    "description": "<p>The device's absolute orientation gamma value ranges from 0 to 1.</p>",
    "synonyms": [
      "absOriG",
      "absOriY",
      "absoluteOrientationY"
    ],
    "examples": [
      "n(absoluteOrientationGamma.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "accelerate",
    "description": "<p>A pattern of numbers that speed up (or slow down) samples while they play. Currently only supported by osc / superdirt.</p>",
    "synonyms": [],
    "examples": [
      "s(\"sax\").accelerate(\"<0 1 2 4 8 16>\").slow(2).osc()"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>acceleration.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "accelerationX",
    "description": "<p>The accelerometer's x-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "accX"
    ],
    "examples": [
      "n(accelerationX.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "accelerationY",
    "description": "<p>The accelerometer's y-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "accY"
    ],
    "examples": [
      "n(accelerationY.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "accelerationZ",
    "description": "<p>The accelerometer's z-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "accZ"
    ],
    "examples": [
      "n(accelerationZ.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "adsr",
    "description": "<p>ADSR envelope: Combination of Attack, Decay, Sustain, and Release.</p>",
    "synonyms": [],
    "examples": [
      "note(\"[c3 bb2 f3 eb3]*2\").sound(\"sawtooth\").lpf(600).adsr(\".1:.1:.5:.2\")"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>attack time in seconds</p>"
      },
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>decay time in seconds</p>"
      },
      {
        "name": "gain",
        "type": "number | Pattern",
        "description": "<p>sustain level (0 to 1)</p>"
      },
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>release time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "amp",
    "description": "<p>Like <code>gain</code>, but linear.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd*8\").amp(\".1*2 .5 .1*2 .5 .1 .5\").osc()"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>gain.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "anchor",
    "description": "<p>The top note to align the voicing to. Defaults to c5</p>",
    "synonyms": [],
    "examples": [
      "anchor(\"<c4 g4 c5 g5>\").chord(\"C\").voicing()"
    ],
    "params": [
      {
        "name": "anchorNote",
        "type": "string | Pattern",
        "description": "<p>the note to align the voicings to</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "as",
    "description": "<p>Sets properties in a batch.</p>",
    "synonyms": [],
    "examples": [
      "\"c:.5 a:1 f:.25 e:.8\".as(\"note:clip\")",
      "\"{0@2 0.25 0 0.5 .3 .5}%8\".as(\"begin\").s(\"sax_vib\").clip(1)"
    ],
    "params": [
      {
        "name": "mapping",
        "type": "String | Array",
        "description": "<p>the control names that are set</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "asym",
    "description": "<p>Asymmetrical diode distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "attack",
    "description": "<p>Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.</p>",
    "synonyms": [
      "att"
    ],
    "examples": [
      "note(\"c3 e3 f3 g3\").attack(\"<0 .1 .5>\")"
    ],
    "params": [
      {
        "name": "attack",
        "type": "number | Pattern",
        "description": "<p>time in seconds.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bank",
    "description": "<p>Select the sound bank to use. To be used together with <code>s</code>. The bank name (+ &quot;_&quot;) will be prepended to the value of <code>s</code>.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd\").bank('RolandTR909') // = s(\"RolandTR909_bd RolandTR909_sd\")"
    ],
    "params": [
      {
        "name": "bank",
        "type": "string | Pattern",
        "description": "<p>the name of the bank</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "beat",
    "description": "<p>creates a structure pattern from divisions of a cycle\nespecially useful for creating rhythms</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd\").beat(\"0,7,10\", 16)",
      "s(\"sd\").beat(\"4,12\", 16)"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "berlin",
    "description": "<p>Generates a continuous pattern of [berlin noise](conceived by Jame Coyne and Jade Rowland as a joke but turned out to be surprisingly cool and useful,\nlike perlin noise but with sawtooth waves), in the range 0..1.</p>",
    "synonyms": [],
    "examples": [
      "// ascending arpeggios\nn(\"0!16\".add(berlin.fast(4).mul(14))).scale(\"d:minor\")"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "binary",
    "description": "<p>Creates a binary pattern from a number.</p>",
    "synonyms": [],
    "examples": [
      "\"hh\".s().struct(binary(5))\n// \"hh\".s().struct(\"1 0 1\")"
    ],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>input number to convert to binary</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "binaryL",
    "description": "<p>Creates a binary list pattern from a number.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>input number to convert to binary\ns(&quot;saw&quot;).seg(8)\n.partials(binaryL(irand(4096).add(1)))</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "binaryN",
    "description": "<p>Creates a binary pattern from a number, padded to n bits long.</p>",
    "synonyms": [],
    "examples": [
      "\"hh\".s().struct(binaryN(55532, 16))\n// \"hh\".s().struct(\"1 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0\")"
    ],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>input number to convert to binary</p>"
      },
      {
        "name": "nBits",
        "type": "number",
        "description": "<p>pattern length, defaults to 16</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "binaryNL",
    "description": "<p>Creates a binary list pattern from a number, padded to n bits long.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>input number to convert to binary</p>"
      },
      {
        "name": "nBits",
        "type": "number",
        "description": "<p>pattern length, defaults to 16</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "bmod",
    "description": "<p>Modulates with the output from a given <code>bus</code>.\nCan be called in sequence like pat.bmod(...).bmod(...) to set up multiple modulators</p>\n<p>Send to an audio bus with <code>otherPat.bus(..)</code>.</p>\n<p>There are two ways to declare which control will be modulated:</p>\n<ol>\n<li>Explicitly put <code>control</code> in the config (e.g. <code>bmod({ id: 2, c: &quot;lpf&quot; })</code>)</li>\n<li>If the control parameter is absent, the control <em>immediately before</em> the <code>bmod</code> call will be used\n(e.g. <code>s(&quot;saw&quot;).lpf(500).bmod({ id: 2 })</code> to modulate <code>lpf</code>)</li>\n</ol>\n<p>Modulators can be referred to by <code>id</code> so that they can be updated later e.g. inside\na <code>sometimes</code>. See example below.</p>",
    "synonyms": [],
    "examples": [
      "modulator: s(\"one\").seg(64).gain(slider(0, 0, 1)).bus(1).dry(0)\ncarrier: s(\"saw\").bmod({ b: 1 })"
    ],
    "params": [
      {
        "name": "config",
        "type": "Object",
        "description": "<p>Bus modulation configuration.</p>"
      },
      {
        "name": "config.bus",
        "type": "string | Pattern",
        "description": "<p>Bus to get modulation signal from</p>"
      },
      {
        "name": "config.control",
        "type": "string | Pattern",
        "description": "<p>Node to modulate. Aliases: c</p>"
      },
      {
        "name": "config.subControl",
        "type": "string | Pattern",
        "description": "<p>Sub-control name to append to the control key. Aliases: sc</p>"
      },
      {
        "name": "config.depth",
        "type": "number | Pattern",
        "description": "<p>Relative modulation depth. Aliases: dep, dr</p>"
      },
      {
        "name": "config.depthabs",
        "type": "number | Pattern",
        "description": "<p>Absolute modulation depth. Aliases: da</p>"
      },
      {
        "name": "config.dc",
        "type": "number | Pattern",
        "description": "<p>DC offset prior to application</p>"
      },
      {
        "name": "config.fxi",
        "type": "number | Pattern",
        "description": "<p>FX index to target</p>"
      },
      {
        "name": "id",
        "type": "string | Pattern",
        "description": "<p>ID to use for this modulator</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpattack",
    "description": "<p>Sets the attack duration for the bandpass filter envelope.</p>",
    "synonyms": [
      "bpa"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.bpf(500)\n.bpa(\"<.5 .25 .1 .01>/4\")\n.bpenv(4)"
    ],
    "params": [
      {
        "name": "attack",
        "type": "number | Pattern",
        "description": "<p>time of the bandpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpdc",
    "description": "<p>DC offset of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "dcoffset",
        "type": "number | Pattern",
        "description": "<p>dc offset. set to 0 for unipolar</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpdecay",
    "description": "<p>Sets the decay duration for the bandpass filter envelope.</p>",
    "synonyms": [
      "bpd"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.bpf(500)\n.bpd(\"<.5 .25 .1 0>/4\")\n.bps(0.2)\n.bpenv(4)"
    ],
    "params": [
      {
        "name": "decay",
        "type": "number | Pattern",
        "description": "<p>time of the bandpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpdepth",
    "description": "<p>Depth of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpdepthfrequency",
    "description": "<p>Depth of the LFO for the bandpass filter, in HZ</p>",
    "synonyms": [
      "bpdepthfreq"
    ],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).bpdepthfrequency(\"<200 500 100 0>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpenv",
    "description": "<p>Sets the bandpass filter envelope modulation depth.</p>",
    "synonyms": [
      "bpe"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.bpf(500)\n.bpa(.5)\n.bpenv(\"<4 2 1 0 -1 -2 -4>/4\")"
    ],
    "params": [
      {
        "name": "modulation",
        "type": "number | Pattern",
        "description": "<p>depth of the bandpass filter envelope between 0 and <em>n</em></p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpf",
    "description": "<p>Sets the center frequency of the <strong>b</strong>and-<strong>p</strong>ass <strong>f</strong>ilter. When using mininotation, you\ncan also optionally supply the 'bpq' parameter separated by ':'.</p>",
    "synonyms": [
      "bandf",
      "bp"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*6\").bpf(\"<1000 2000 4000 8000>\")"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number | Pattern",
        "description": "<p>center frequency</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpq",
    "description": "<p>Sets the <strong>b</strong>and-<strong>p</strong>ass <strong>q</strong>-factor (resonance).</p>",
    "synonyms": [
      "bandq"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").bpf(500).bpq(\"<0 1 2 3>\")"
    ],
    "params": [
      {
        "name": "q",
        "type": "number | Pattern",
        "description": "<p>q factor</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bprate",
    "description": "<p>Rate of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bprelease",
    "description": "<p>Sets the release time for the bandpass filter envelope.</p>",
    "synonyms": [
      "bpr"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.clip(.5)\n.bpf(500)\n.bpenv(4)\n.bpr(\"<.5 .25 .1 0>/4\")\n.release(.5)"
    ],
    "params": [
      {
        "name": "release",
        "type": "number | Pattern",
        "description": "<p>time of the bandpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpshape",
    "description": "<p>Shape of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>Shape of the lfo (0, 1, 2, ..)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpskew",
    "description": "<p>Skew of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "skew",
        "type": "number | Pattern",
        "description": "<p>How much to bend the LFO shape</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpsustain",
    "description": "<p>Sets the sustain amplitude for the bandpass filter envelope.</p>",
    "synonyms": [
      "bps"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.bpf(500)\n.bpd(.5)\n.bps(\"<0 .25 .5 1>/4\")\n.bpenv(4)"
    ],
    "params": [
      {
        "name": "sustain",
        "type": "number | Pattern",
        "description": "<p>amplitude of the bandpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "bpsync",
    "description": "<p>Cycle-synced rate of the LFO for the bandpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "brand",
    "description": "<p>A continuous pattern of 0 or 1 (binary random)</p>",
    "synonyms": [],
    "examples": [
      "s(\"hh*10\").pan(brand)"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "brandBy",
    "description": "<p>A continuous pattern of 0 or 1 (binary random), with a probability for the value being 1</p>",
    "synonyms": [],
    "examples": [
      "s(\"hh*10\").pan(brandBy(0.2))"
    ],
    "params": [
      {
        "name": "probability",
        "type": "number",
        "description": "<p>a number between 0 and 1</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "bus",
    "description": "<p>A <code>bus</code> is a send which can be used for mixing patterns. It combines with..\ns(&quot;bus&quot;) to play that bus through another pattern (for, say, applying non-linear\neffects like distortion to multiple signals)</p>\n<p>otherPat.bmod(..) (to modulate another pattern with the bus)</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "number",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "busgain",
    "description": "<p>Postgain multiplier prior to sending the signal to the audio bus.</p>",
    "synonyms": [
      "bgain"
    ],
    "examples": [],
    "params": [
      {
        "name": "number",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "byteBeatExpression",
    "description": "<p>Create byte beats with custom expressions</p>",
    "synonyms": [
      "bbexpr"
    ],
    "examples": [
      "s(\"bytebeat\").bbexpr('t*(t>>15^t>>66)')"
    ],
    "params": [
      {
        "name": "byteBeatExpression",
        "type": "number | Pattern",
        "description": "<p>bitwise expression for creating bytebeat</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "byteBeatStartTime",
    "description": "<p>Create byte beats with custom expressions</p>",
    "synonyms": [
      "bbst"
    ],
    "examples": [
      "note(\"c3!8\".add(\"{0 0 12 0 7 5 3}%8\")).s(\"bytebeat:5\").bbst(\"<3 1>\".mul(10000))._scope()"
    ],
    "params": [
      {
        "name": "byteBeatStartTime",
        "type": "number | Pattern",
        "description": "<p>in samples (t)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "ccn",
    "description": "<p>MIDI control number: Sends a MIDI control change message.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "MIDI",
        "type": "number | Pattern",
        "description": "<p>control number (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "ccv",
    "description": "<p>MIDI control value: Sends a MIDI control change message.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "MIDI",
        "type": "number | Pattern",
        "description": "<p>control value (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "channel",
    "description": "<p>Choose the channel the pattern is sent to in superdirt</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "channel",
        "type": "number | Pattern",
        "description": "<p>channel number</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "channels",
    "description": "<p>Allows you to set the output channels on the interface</p>",
    "synonyms": [
      "ch"
    ],
    "examples": [
      "note(\"e a d b g\").channels(\"3:4\")"
    ],
    "params": [
      {
        "name": "channels",
        "type": "number | Pattern",
        "description": "<p>pattern the output channels</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "chebyshev",
    "description": "<p>Distortion via Chebyshev polynomials</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "chord",
    "description": "<p>The chord to voice</p>",
    "synonyms": [],
    "examples": [
      "chord(\"<Am C D F Am E Am E>\").voicing()"
    ],
    "params": [
      {
        "name": "symbols",
        "type": "string | Pattern",
        "description": "<p>chord symbols to voice e.g., C, Eb, Fm7, G7. The symbols can be defined via addVoicings</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "chorus",
    "description": "<p>mix control for the chorus effect</p>",
    "synonyms": [],
    "examples": [
      "note(\"d d a# a\").s(\"sawtooth\").chorus(.5)"
    ],
    "params": [
      {
        "name": "chorus",
        "type": "string | Pattern",
        "description": "<p>mix amount between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "clip",
    "description": "<p>Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.</p>",
    "synonyms": [
      "legato"
    ],
    "examples": [
      "note(\"c a f e\").s(\"piano\").clip(\"<.5 1 2>\")"
    ],
    "params": [
      {
        "name": "factor",
        "type": "number | Pattern",
        "description": "<blockquote>\n<p>= 0</p>\n</blockquote>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "coarse",
    "description": "<p>Fake-resampling for lowering the sample rate. Caution: This effect seems to only work in chromium based browsers</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").coarse(\"<1 4 8 16 32>\")"
    ],
    "params": [
      {
        "name": "factor",
        "type": "number | Pattern",
        "description": "<p>1 for original 2 for half, 3 for a third and so on.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "color",
    "description": "<p>Sets the color of the hap in visualizations like pianoroll or highlighting.</p>",
    "synonyms": [
      "colour"
    ],
    "examples": [],
    "params": [
      {
        "name": "color",
        "type": "string",
        "description": "<p>Hexadecimal or CSS color name</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "compressor",
    "description": "<p>Dynamics Compressor. The params are <code>compressor(&quot;threshold:ratio:knee:attack:release&quot;)</code>\nMore info <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode?retiredLocale=de#instance_properties\">here</a></p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\")\n.compressor(\"-20:20:10:.002:.02\")"
    ],
    "params": [],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "control",
    "description": "<p>MIDI control: Sends a MIDI control change message.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "MIDI",
        "type": "number | Pattern",
        "description": "<p>control number (0-127)</p>"
      },
      {
        "name": "MIDI",
        "type": "number | Pattern",
        "description": "<p>controller value (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "crush",
    "description": "<p>Bit crusher effect.</p>",
    "synonyms": [],
    "examples": [
      "s(\"<bd sd>,hh*3\").fast(2).crush(\"<16 8 7 6 5 4 3 2>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>between 1 (for drastic reduction in bit-depth) to 16 (for barely no reduction).</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "cubic",
    "description": "<p>Cubic polynomial distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "cut",
    "description": "<p>In the style of classic drum-machines, <code>cut</code> will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.</p>",
    "synonyms": [],
    "examples": [
      "s(\"[oh hh]*4\").cut(1)"
    ],
    "params": [
      {
        "name": "group",
        "type": "number | Pattern",
        "description": "<p>cut group number</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "decay",
    "description": "<p>Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.\nNote that the decay is only audible if the sustain value is lower than 1.</p>",
    "synonyms": [
      "dec"
    ],
    "examples": [
      "note(\"c3 e3 f3 g3\").decay(\"<.1 .2 .3 .4>\").sustain(0)"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>decay time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "delay",
    "description": "<p>Sets the level of the delay signal.</p>\n<p>When using mininotation, you can also optionally add the 'delaytime' and 'delayfeedback' parameter,\nseparated by ':'.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd bd\").delay(\"<0 .25 .5 1>\")",
      "s(\"bd bd\").delay(\"0.65:0.25:0.9 0.65:0.125:0.7\")"
    ],
    "params": [
      {
        "name": "level",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "delayfeedback",
    "description": "<p>Sets the level of the signal that is fed back into the delay.\nCaution: Values &gt;= 1 will result in a signal that gets louder and louder! Don't do it</p>",
    "synonyms": [
      "delayfb",
      "dfb"
    ],
    "examples": [
      "s(\"bd\").delay(.25).delayfeedback(\"<.25 .5 .75 1>\")"
    ],
    "params": [
      {
        "name": "feedback",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "delayfeedback",
    "description": "<p>Sets the level of the signal that is fed back into the delay.\nCaution: Values &gt;= 1 will result in a signal that gets louder and louder! Don't do it</p>",
    "synonyms": [
      "delayfb",
      "dfb"
    ],
    "examples": [
      "s(\"bd\").delay(.25).delayfeedback(\"<.25 .5 .75 1>\")"
    ],
    "params": [
      {
        "name": "feedback",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "delayspeed",
    "description": "<p>Sets the time of the delay effect.</p>",
    "synonyms": [
      "delayt",
      "dt"
    ],
    "examples": [
      "note(\"d d a# a\".fast(2)).s(\"sawtooth\").delay(.8).delaytime(1/2).delayspeed(\"<2 .5 -1 -2>\")"
    ],
    "params": [
      {
        "name": "delayspeed",
        "type": "number | Pattern",
        "description": "<p>controls the pitch of the delay feedback</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "delaysync",
    "description": "<p>Sets the time of the delay effect in cycles.</p>",
    "synonyms": [
      "delayt",
      "dt"
    ],
    "examples": [
      "s(\"bd bd\").delay(.25).delaysync(\"<1 2 3 5>\".div(8))"
    ],
    "params": [
      {
        "name": "cycles",
        "type": "number | Pattern",
        "description": "<p>delay length in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "density",
    "description": "<p>Noise crackle density</p>",
    "synonyms": [],
    "examples": [
      "s(\"crackle*4\").density(\"<0.01 0.04 0.2 0.5>\".slow(4))"
    ],
    "params": [
      {
        "name": "density",
        "type": "number | Pattern",
        "description": "<p>between 0 and x</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "detune",
    "description": "<p>Set detune for stacked voices of supported oscillators</p>",
    "synonyms": [
      "det"
    ],
    "examples": [
      "note(\"d f a a# a d3\").fast(2).s(\"supersaw\").detune(\"<.1 .2 .5 24.1>\")"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "dictionary",
    "description": "<p>Which dictionary to use for the voicings. This falls back to the default dictionary if not provided</p>",
    "synonyms": [],
    "examples": [
      "addVoicings('house', {\n'': ['7 12 16', '0 7 16', '4 7 12'],\n'm': ['0 3 7']\n})\nchord(\"<Am C D F Am E Am E>\")\n.dict('house').anchor(66)\n.voicing().room(.5)"
    ],
    "params": [
      {
        "name": "dictionaryName",
        "type": "string",
        "description": "<p>which dictionary (having been defined with <code>addVoicings</code>) to use</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "diode",
    "description": "<p>Diode-emulating distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "distort",
    "description": "<p>Wave shaping distortion. CAUTION: it can get loud.\nSecond option in optional array syntax (ex: &quot;.9:.5&quot;) applies a postgain to the output. Third option sets the waveshaping type.\nMost useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)</p>",
    "synonyms": [
      "dist"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").distort(\"<0 2 3 10:.5>\")",
      "note(\"d1!8\").s(\"sine\").penv(36).pdecay(.12).decay(.23).distort(\"8:.4\")",
      "s(\"bd:4*4\").bank(\"tr808\").distort(\"3:0.5:diode\")"
    ],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      },
      {
        "name": "type",
        "type": "number | string | Pattern",
        "description": "<p>type of distortion to apply</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "distorttype",
    "description": "<p>Type of waveshaping distortion to apply.</p>",
    "synonyms": [
      "disttype"
    ],
    "examples": [
      "s(\"bd*4\").bank(\"tr909\").distort(2).distorttype(\"<0 1 2>\")",
      "s(\"sine\").note(\"F1*2\").release(1)\n  .penv(24).pdecay(0.05)\n  .distort(rand.range(1, 8))\n  .distorttype(\"<fold chebyshev scurve diode asym sinefold>\")"
    ],
    "params": [
      {
        "name": "type",
        "type": "number | string | Pattern",
        "description": "<p>type of distortion to apply</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "distortvol",
    "description": "<p>Postgain for waveshaping distortion.</p>",
    "synonyms": [
      "distvol"
    ],
    "examples": [
      "s(\"bd*4\").bank(\"tr909\").distort(2).distortvol(0.8)"
    ],
    "params": [
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "djf",
    "description": "<p>DJ filter, below 0.5 is low pass filter, above is high pass filter.</p>",
    "synonyms": [],
    "examples": [
      "n(irand(16).seg(8)).scale(\"d:phrygian\").s(\"supersaw\").djf(\"<.5 .3 .2 .75>\")"
    ],
    "params": [
      {
        "name": "cutoff",
        "type": "number | Pattern",
        "description": "<p>below 0.5 is low pass filter, above is high pass filter</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "drive",
    "description": "<p>Filter overdrive for supported filter types</p>",
    "synonyms": [],
    "examples": [
      "note(\"{f g g c d a a#}%16\".sub(17)).s(\"supersaw\").lpenv(8).lpf(150).lpq(.8).ftype('ladder').drive(\"<.5 4>\")"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "dry",
    "description": "<p>Set dryness of reverb. See <code>room</code> and <code>size</code> for more information about reverb.</p>",
    "synonyms": [],
    "examples": [
      "n(\"[0,3,7](3,8)\").s(\"superpiano\").room(.7).dry(\"<0 .5 .75 1>\").osc()"
    ],
    "params": [
      {
        "name": "dry",
        "type": "number | Pattern",
        "description": "<p>0 = wet, 1 = dry</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "duckattack",
    "description": "<p>The time required for the ducked signal(s) to return to their normal volume.</p>\n<p>Can vary across orbits with the ':' mininotation, e.g. <code>duckonset(&quot;0:0.003&quot;)</code>.\nNote: this requires first applying the effect to multiple orbits with e.g. <code>duckorbit(&quot;2:3&quot;)</code>.</p>",
    "synonyms": [
      "duckatt"
    ],
    "examples": [
      "sound: n(run(8)).scale(\"c:minor\").s(\"sawtooth\").delay(.7).orbit(2)\nducker: s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(2).duckattack(\"<0.2 0 0.4>\").duckdepth(1)",
      "moreduck: n(run(8)).scale(\"c:minor\").s(\"sawtooth\").delay(.7).orbit(2)\nlessduck: s(\"hh*16\").orbit(5)\nducker: s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(\"2:5\").duckattack(\"0.4:0.1\")"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>The attack time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "duckdepth",
    "description": "<p>The amount of ducking applied to target orbit</p>\n<p>Can vary across orbits with the ':' mininotation, e.g. <code>duckdepth(&quot;0.3:0.1&quot;)</code>.\nNote: this requires first applying the effect to multiple orbits with e.g. <code>duckorbit(&quot;2:3&quot;)</code>.</p>",
    "synonyms": [],
    "examples": [
      "stack( n(run(8)).scale(\"c:minor\").s(\"sawtooth\").delay(.7).orbit(2), s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(2).duckattack(0.2).duckdepth(\"<1 .9 .6 0>\"))",
      "$: n(run(16)).scale(\"c:minor:pentatonic\").s(\"sawtooth\").delay(.7).orbit(2)\n$: s(\"hh*16\").orbit(3)\n$: s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(\"2:3\").duckattack(0.2).duckdepth(\"1:0.5\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation from 0 to 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "duckonset",
    "description": "<p>The time required for the ducked signal(s) to reach their lowest volume.\nCan be used to prevent clicking or for creative rhythmic effects.</p>\n<p>Can vary across orbits with the ':' mininotation, e.g. <code>duckonset(&quot;0:0.003&quot;)</code>.\nNote: this requires first applying the effect to multiple orbits with e.g. <code>duckorbit(&quot;2:3&quot;)</code>.</p>",
    "synonyms": [
      "duckons"
    ],
    "examples": [
      "// Clicks\nsound: freq(\"63.2388\").s(\"sine\").orbit(2).gain(4)\nduckerWithClick: s(\"bd*4\").duckorbit(2).duckattack(0.3).duckonset(0).postgain(0)",
      "// No clicks\nsound: freq(\"63.2388\").s(\"sine\").orbit(2).gain(4)\nduckerWithoutClick: s(\"bd*4\").duckorbit(2).duckattack(0.3).duckonset(0.01).postgain(0)",
      "// Rhythmic\nnoise: s(\"pink\").distort(\"2:1\").orbit(4) // used rhythmically with 0.3 onset below\nhhat: s(\"hh*16\").orbit(7)\nducker: s(\"bd*4\").bank(\"tr909\").duckorbit(\"4:7\").duckonset(\"0.3:0.003\").duckattack(0.25)"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>The onset time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "duckorbit",
    "description": "<p>Modulate the amplitude of an orbit to create a &quot;sidechain&quot; like effect.</p>\n<p>Can be applied to multiple orbits with the ':' mininotation, e.g. <code>duckorbit(&quot;2:3&quot;)</code></p>",
    "synonyms": [
      "duck"
    ],
    "examples": [
      "$: n(run(16)).scale(\"c:minor:pentatonic\").s(\"sawtooth\").delay(.7).orbit(2)\n$: s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(2).duckattack(0.2).duckdepth(1)",
      "$: n(run(16)).scale(\"c:minor:pentatonic\").s(\"sawtooth\").delay(.7).orbit(2)\n$: s(\"hh*16\").orbit(3)\n$: s(\"bd:4!4\").beat(\"0,4,8,11,14\",16).duckorbit(\"2:3\").duckattack(0.2).duckdepth(1)"
    ],
    "params": [
      {
        "name": "orbit",
        "type": "number | Pattern",
        "description": "<p>target orbit</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "duration",
    "description": "<p>Sets the duration of the event in cycles. Similar to clip / legato, it also cuts samples off at the end if they exceed the duration.</p>",
    "synonyms": [
      "dur"
    ],
    "examples": [
      "note(\"c a f e\").s(\"piano\").dur(\"<.5 1 2>\")"
    ],
    "params": [
      {
        "name": "seconds",
        "type": "number | Pattern",
        "description": "<blockquote>\n<p>= 0</p>\n</blockquote>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "echoWith",
    "description": "<p>Superimpose and offset multiple times, applying the given function each time.</p>",
    "synonyms": [
      "echowith",
      "stutWith",
      "stutwith"
    ],
    "examples": [
      "\"<0 [2 4]>\"\n.echoWith(4, 1/8, (p,n) => p.add(n*2))\n.scale(\"C:minor\").note()"
    ],
    "params": [
      {
        "name": "times",
        "type": "number",
        "description": "<p>how many times to repeat</p>"
      },
      {
        "name": "time",
        "type": "number",
        "description": "<p>cycle offset between iterations</p>"
      },
      {
        "name": "func",
        "type": "function",
        "description": "<p>function to apply, given the pattern and the iteration index</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "env",
    "description": "<p>Configures an envelope. Can be called in sequence like pat.env(...).env(...) to set up multiple envelopes\nThere are two ways to declare which control will be modulated:</p>\n<ol>\n<li>Explicitly put <code>control</code> in the config (e.g. <code>env({ c: &quot;lpf&quot; })</code>)</li>\n<li>If the control parameter is absent, the control <em>immediately before</em> the <code>env</code> call will be used\n(e.g. <code>s(&quot;saw&quot;).lpf(500).env({ a: 1 })</code> to modulate <code>lpf</code>)</li>\n</ol>\n<p>Modulators can be referred to by <code>id</code> so that they can be updated later e.g. inside\na <code>sometimes</code>. See example below.</p>",
    "synonyms": [],
    "examples": [
      "s(\"saw\").note(\"F1\").lpf(500).env({ a: 1 })",
      "s(\"saw\").env({ d: 1 }).note(\"F1\")\n  .lpq(4).lpf(50)\n  .env({ a: 0.1, d: 1, ac: 0.8, dc: 0.3, depth: 50 })",
      "s(\"saw\").lpf(500).diode(0.3)\n  .env({ c: \"lpf\", a: 0.5, d: 0.5 })",
      "s(\"pulse\").lpf(500).env({ a: 1 })\n  .env({ c: \"s\", a: 1 })\n  .diode(0.3)\n  .sometimes(x => x.env({ a: \"0.5\" }, 1)) // envelope #1 (0-indexed)",
      "s(\"pulse\").lpf(500).env({ a: 1 }, 'lpf_mod')\n  .env({ c: \"s\", a: 1 })\n  .diode(0.3)\n  .sometimes(x => x.env({ a: \"0.5\" }, 'lpf_mod'))"
    ],
    "params": [
      {
        "name": "config",
        "type": "Object",
        "description": "<p>Envelope configuration.</p>"
      },
      {
        "name": "config.control",
        "type": "string | Pattern",
        "description": "<p>Node to modulate. Aliases: c</p>"
      },
      {
        "name": "config.subControl",
        "type": "string | Pattern",
        "description": "<p>Sub-control name to append to the control key. Aliases: sc</p>"
      },
      {
        "name": "config.depth",
        "type": "number | Pattern",
        "description": "<p>Relative modulation depth. Aliases: dep, dr</p>"
      },
      {
        "name": "config.depthabs",
        "type": "number | Pattern",
        "description": "<p>Absolute modulation depth. Aliases: da</p>"
      },
      {
        "name": "config.attack",
        "type": "number | Pattern",
        "description": "<p>Time to reach depth. Aliases: att, a</p>"
      },
      {
        "name": "config.decay",
        "type": "number | Pattern",
        "description": "<p>Time to reach sustain. Aliases: dec, d</p>"
      },
      {
        "name": "config.sustain",
        "type": "number | Pattern",
        "description": "<p>Sustain depth. Aliases: sus, s</p>"
      },
      {
        "name": "config.release",
        "type": "number | Pattern",
        "description": "<p>Time to return to nominal value. Aliases: rel, r</p>"
      },
      {
        "name": "config.acurve",
        "type": "number | Pattern",
        "description": "<p>Snappiness of attack curve (-1 = relaxed, 1 = snappy). Aliases: ac</p>"
      },
      {
        "name": "config.dcurve",
        "type": "number | Pattern",
        "description": "<p>Snappiness of decay curve (-1 = relaxed, 1 = snappy). Aliases: dc</p>"
      },
      {
        "name": "config.rcurve",
        "type": "number | Pattern",
        "description": "<p>Snappiness of release curve (-1 = relaxed, 1 = snappy). Aliases: rc</p>"
      },
      {
        "name": "config.fxi",
        "type": "number | Pattern",
        "description": "<p>FX index to target</p>"
      },
      {
        "name": "id",
        "type": "string | Pattern",
        "description": "<p>ID to use for this modulator</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fanchor",
    "description": "<p>controls the center of the filter envelope. 0 is unipolar positive, .5 is bipolar, 1 is unipolar negative</p>",
    "synonyms": [],
    "examples": [
      "note(\"{f g g c d a a#}%8\").s(\"sawtooth\").lpf(\"{1000}%2\")\n.lpenv(8).fanchor(\"<0 .5 1>\")"
    ],
    "params": [
      {
        "name": "center",
        "type": "number | Pattern",
        "description": "<p>0 to 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fastGap",
    "description": "<p>speeds up a pattern like fast, but rather than it playing multiple times as fast would it instead leaves a gap in the remaining space of the cycle. For example, the following will play the sound pattern &quot;bd sn&quot; only once but compressed into the first half of the cycle, i.e. twice as fast.</p>",
    "synonyms": [
      "fastgap"
    ],
    "examples": [
      "s(\"bd sd\").fastGap(2)"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "filter",
    "description": "<p>Filters haps using the given function</p>",
    "synonyms": [],
    "examples": [
      "s(\"hh!7 oh\").filter(hap => hap.value.s === 'hh')"
    ],
    "params": [
      {
        "name": "test",
        "type": "function",
        "description": "<p>function to test Hap</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "filterWhen",
    "description": "<p>Filters haps by their begin time</p>",
    "synonyms": [],
    "examples": [
      "oneCycle: s(\"bd*4\").filterWhen((t) => t < 1)"
    ],
    "params": [
      {
        "name": "test",
        "type": "function",
        "description": "<p>function to test Hap.whole.begin</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "fit",
    "description": "<p>Makes the sample fit its event duration. Good for rhythmical loops like drum breaks.\nSimilar to <code>loopAt</code>.</p>",
    "synonyms": [],
    "examples": [
      "samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })\ns(\"rhodes/2\").fit()"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "fmattack",
    "description": "<p>Attack time for the FM envelope: time it takes to reach maximum modulation</p>\n<p>A number may be added afterwards to control the attack of the envelope of\nany of the 8 individual FMs (e.g. <code>fmatt5</code>)</p>",
    "synonyms": [
      "fmatt"
    ],
    "examples": [
      "note(\"c e g b g e\")\n.fm(4)\n.fmattack(\"<0 .05 .1 .2>\")\n._scope()"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>attack time</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmdecay",
    "description": "<p>Decay time for the FM envelope: seconds until the sustain level is reached after the attack phase.</p>\n<p>A number may be added afterwards to control the decay of the envelope of\nany of the 8 individual FMs (e.g. <code>fmdec6</code>)</p>",
    "synonyms": [
      "fmdec"
    ],
    "examples": [
      "note(\"c e g b g e\")\n.fm(4)\n.fmdecay(\"<.01 .05 .1 .2>\")\n.fmsustain(.4)\n._scope()"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>decay time</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmenv",
    "description": "<p>Ramp type of fm envelope. Exp might be a bit broken..</p>\n<p>A number may be added afterwards to control the envelope of\nany of the 8 individual FMs (e.g. <code>fmenv4</code>)</p>",
    "synonyms": [],
    "examples": [
      "note(\"c e g b g e\")\n.fm(4)\n.fmdecay(.2)\n.fmsustain(0)\n.fmenv(\"<exp lin>\")\n._scope()"
    ],
    "params": [
      {
        "name": "type",
        "type": "number | Pattern",
        "description": "<p>lin | exp</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmh",
    "description": "<p>Sets the Frequency Modulation Harmonicity Ratio.\nControls the timbre of the sound.\nWhole numbers and simple ratios sound more natural,\nwhile decimal numbers and complex ratios sound metallic.</p>\n<p>A number may be added afterwards to control the harmonicity of\nany of the 8 individual FMs (e.g. <code>fmh2</code>)</p>",
    "synonyms": [],
    "examples": [
      "note(\"c e g b g e\")\n.fm(4)\n.fmh(\"<1 2 1.5 1.61>\")\n._scope()"
    ],
    "params": [
      {
        "name": "harmonicity",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmi",
    "description": "<p>Sets the Frequency Modulation of the synth.\nControls the modulation index, which defines the brightness of the sound.</p>\n<p>A number may be added afterwards to control the modulation index of\nany of the 8 individual FMs (e.g. <code>fm3</code>). Also, FMs may be routed into\neach other with matrix commands like <code>fm13</code>, which would send <code>fm1</code> back into\n<code>fm3</code></p>",
    "synonyms": [
      "fm"
    ],
    "examples": [
      "note(\"c e g b g e\")\n.fm(\"<0 1 2 8 32>\")\n._scope()",
      "s(\"sine\").note(\"F1\").seg(8)\n .fm(4).fm2(rand.mul(4)).fm3(saw.mul(8).slow(8))\n .fmh(1.06).fmh2(10).fmh3(0.1)"
    ],
    "params": [
      {
        "name": "brightness",
        "type": "number | Pattern",
        "description": "<p>modulation index</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmrelease",
    "description": "<p>Release time for the FM envelope: how much modulation is applied after the note is released</p>\n<p>A number may be added afterwards to control the release of the envelope of\nany of the 8 individual FMs (e.g. <code>fmrel8</code>)</p>",
    "synonyms": [
      "fmrel"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>release time</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmsustain",
    "description": "<p>Sustain level for the FM envelope: how much modulation is applied after the decay phase</p>\n<p>A number may be added afterwards to control the sustain of the envelope of\nany of the 8 individual FMs (e.g. <code>fmsus7</code>)</p>",
    "synonyms": [
      "fmsus"
    ],
    "examples": [
      "note(\"c e g b g e\")\n.fm(4)\n.fmdecay(.1)\n.fmsustain(\"<1 .75 .5 0>\")\n._scope()"
    ],
    "params": [
      {
        "name": "level",
        "type": "number | Pattern",
        "description": "<p>sustain level</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fmwave",
    "description": "<p>Waveform of the fm modulator</p>\n<p>A number may be added afterwards to control the waveform\nany of the 8 individual FMs (e.g. <code>fmwave6</code>)</p>",
    "synonyms": [],
    "examples": [
      "n(\"0 1 2 3\".fast(4)).scale(\"d:minor\").s(\"sine\").fmwave(\"<sine square sawtooth crackle>\").fm(4).fmh(2.01)",
      "n(\"0 1 2 3\".fast(4)).chord(\"<Dm Am F G>\").voicing().s(\"sawtooth\").fmwave(\"brown\").fm(.6)"
    ],
    "params": [
      {
        "name": "wave",
        "type": "number | Pattern",
        "description": "<p>waveform</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fold",
    "description": "<p>Wavefolding distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "freq",
    "description": "<p>Set frequency of sound.</p>",
    "synonyms": [],
    "examples": [
      "freq(\"220 110 440 110\").s(\"superzow\").osc()",
      "freq(\"110\".mul.out(\".5 1.5 .6 [2 3]\")).s(\"superzow\").osc()"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number | Pattern",
        "description": "<p>in Hz. the audible range is between 20 and 20000 Hz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "fscope",
    "description": "<p>Renders an oscilloscope for the frequency domain of the audio signal.</p>",
    "synonyms": [],
    "examples": [
      "s(\"sawtooth\").fscope()"
    ],
    "params": [
      {
        "name": "color",
        "type": "string",
        "description": "<p>line color as hex or color name. defaults to white.</p>"
      },
      {
        "name": "scale",
        "type": "number",
        "description": "<p>scales the y-axis. Defaults to 0.25</p>"
      },
      {
        "name": "pos",
        "type": "number",
        "description": "<p>y-position relative to screen height. 0 = top, 1 = bottom of screen</p>"
      },
      {
        "name": "lean",
        "type": "number",
        "description": "<p>y-axis alignment where 0 = top and 1 = bottom</p>"
      },
      {
        "name": "min",
        "type": "number",
        "description": "<p>min value</p>"
      },
      {
        "name": "max",
        "type": "number",
        "description": "<p>max value</p>"
      }
    ],
    "file": "scope",
    "superdirtOnly": false
  },
  {
    "name": "ftype",
    "description": "<p>Sets the filter type. The ladder filter is more aggressive. More types might be added in the future.</p>",
    "synonyms": [],
    "examples": [
      "note(\"{f g g c d a a#}%8\").s(\"sawtooth\").lpenv(4).lpf(500).ftype(\"<0 1 2>\").lpq(1)",
      "note(\"c f g g a c d4\").fast(2)\n.sound('sawtooth')\n.lpf(200).fanchor(0)\n.lpenv(3).lpq(1)\n.ftype(\"<ladder 12db 24db>\")"
    ],
    "params": [
      {
        "name": "type",
        "type": "number | Pattern",
        "description": "<p>12db (0), ladder (1), or 24db (2)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "gain",
    "description": "<p>Controls the gain by an exponential amount.</p>",
    "synonyms": [],
    "examples": [
      "s(\"hh*8\").gain(\".4!2 1 .4!2 1 .4 1\").fast(2)"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>gain.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "gap",
    "description": "<p>Does absolutely nothing, but with a given metrical 'steps'</p>",
    "synonyms": [],
    "examples": [
      "gap(3) // \"~@3\""
    ],
    "params": [
      {
        "name": "steps",
        "type": "number",
        "description": ""
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "gravityX",
    "description": "<p>The device's gravity x-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "gravX"
    ],
    "examples": [
      "n(gravityX.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "gravityY",
    "description": "<p>The device's gravity y-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "gravY"
    ],
    "examples": [
      "n(gravityY.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "gravityZ",
    "description": "<p>The device's gravity z-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "gravZ"
    ],
    "examples": [
      "n(gravityZ.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "hard",
    "description": "<p>Hard-clipping distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "hpattack",
    "description": "<p>Sets the attack duration for the highpass filter envelope.</p>",
    "synonyms": [
      "hpa"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.hpf(500)\n.hpa(\"<.5 .25 .1 .01>/4\")\n.hpenv(4)"
    ],
    "params": [
      {
        "name": "attack",
        "type": "number | Pattern",
        "description": "<p>time of the highpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpdc",
    "description": "<p>DC offset of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "dcoffset",
        "type": "number | Pattern",
        "description": "<p>dc offset. set to 0 for unipolar</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpdecay",
    "description": "<p>Sets the decay duration for the highpass filter envelope.</p>",
    "synonyms": [
      "hpd"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.hpf(500)\n.hpd(\"<.5 .25 .1 0>/4\")\n.hps(0.2)\n.hpenv(4)"
    ],
    "params": [
      {
        "name": "decay",
        "type": "number | Pattern",
        "description": "<p>time of the highpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpdepth",
    "description": "<p>Depth of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpdepthfrequency",
    "description": "<p>Depth of the LFO for the hipass filter, in hz</p>",
    "synonyms": [
      "hpdepthfreq"
    ],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).hpdepthfrequency(\"<200 500 100 0>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpenv",
    "description": "<p>Sets the highpass filter envelope modulation depth.</p>",
    "synonyms": [
      "hpe"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.hpf(500)\n.hpa(.5)\n.hpenv(\"<4 2 1 0 -1 -2 -4>/4\")"
    ],
    "params": [
      {
        "name": "modulation",
        "type": "number | Pattern",
        "description": "<p>depth of the highpass filter envelope between 0 and <em>n</em></p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpf",
    "description": "<p>Applies the cutoff frequency of the <strong>h</strong>igh-<strong>p</strong>ass <strong>f</strong>ilter.</p>\n<p>When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.</p>",
    "synonyms": [
      "hp",
      "hcutoff"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").hpf(\"<4000 2000 1000 500 200 100>\")",
      "s(\"bd sd [~ bd] sd,hh*8\").hpf(\"<2000 2000:25>\")"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number | Pattern",
        "description": "<p>audible between 0 and 20000</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpq",
    "description": "<p>Controls the <strong>h</strong>igh-<strong>p</strong>ass <strong>q</strong>-value.</p>",
    "synonyms": [
      "hresonance"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").hpf(2000).hpq(\"<0 10 20 30>\")"
    ],
    "params": [
      {
        "name": "q",
        "type": "number | Pattern",
        "description": "<p>resonance factor between 0 and 50</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hprate",
    "description": "<p>Rate of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hprelease",
    "description": "<p>Sets the release time for the highpass filter envelope.</p>",
    "synonyms": [
      "hpr"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.clip(.5)\n.hpf(500)\n.hpenv(4)\n.hpr(\"<.5 .25 .1 0>/4\")\n.release(.5)"
    ],
    "params": [
      {
        "name": "release",
        "type": "number | Pattern",
        "description": "<p>time of the highpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpshape",
    "description": "<p>Shape of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>Shape of the lfo (0, 1, 2, ..)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpskew",
    "description": "<p>Skew of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "skew",
        "type": "number | Pattern",
        "description": "<p>How much to bend the LFO shape</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpsustain",
    "description": "<p>Sets the sustain amplitude for the highpass filter envelope.</p>",
    "synonyms": [
      "hps"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.hpf(500)\n.hpd(.5)\n.hps(\"<0 .25 .5 1>/4\")\n.hpenv(4)"
    ],
    "params": [
      {
        "name": "sustain",
        "type": "number | Pattern",
        "description": "<p>amplitude of the highpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "hpsync",
    "description": "<p>Cycle-synced rate of the LFO for the highpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "inhabit",
    "description": "<p>Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).\nSimilar to <code>pick</code>, but cycles are squeezed into the target ('inhabited') pattern.</p>",
    "synonyms": [
      "pickSqueeze"
    ],
    "examples": [
      "\"<a b [a,b]>\".inhabit({a: s(\"bd(3,8)\"),\n                            b: s(\"cp sd\")\n                           })",
      "s(\"a@2 [a b] a\".inhabit({a: \"bd(3,8)\", b: \"sd sd\"})).slow(4)"
    ],
    "params": [
      {
        "name": "pat",
        "type": "Pattern",
        "description": ""
      },
      {
        "name": "xs",
        "type": "*",
        "description": ""
      }
    ],
    "file": "pick",
    "superdirtOnly": false
  },
  {
    "name": "inhabitmod",
    "description": "<p>The same as <code>inhabit</code>, but if you pick a number greater than the size of the list,\nit wraps around, rather than sticking at the maximum value.\nFor example, if you pick the fifth pattern of a list of three, you'll get the\nsecond one.</p>",
    "synonyms": [
      "pickmodSqueeze"
    ],
    "examples": [],
    "params": [
      {
        "name": "pat",
        "type": "Pattern",
        "description": ""
      },
      {
        "name": "xs",
        "type": "*",
        "description": ""
      }
    ],
    "file": "pick",
    "superdirtOnly": false
  },
  {
    "name": "invert",
    "description": "<p>Swaps 1s and 0s in a binary pattern.</p>",
    "synonyms": [
      "inv"
    ],
    "examples": [
      "s(\"bd\").struct(\"1 0 0 1 0 0 1 0\".lastOf(4, invert))"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "irand",
    "description": "<p>A continuous pattern of random integers, between 0 and n-1.</p>",
    "synonyms": [],
    "examples": [
      "// randomly select scale notes from 0 - 7 (= C to C)\nn(irand(8)).struct(\"x x*2 x x*3\").scale(\"C:minor\")"
    ],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>max value (exclusive)</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "irbegin",
    "description": "<p>Sets the beginning of the IR response sample</p>",
    "synonyms": [
      "ir"
    ],
    "examples": [
      "samples('github:switchangel/pad')\n$: s(\"brk/2\").fit().scrub(irand(16).div(16).seg(8)).ir(\"swpad:4\").room(.65).irspeed(\"-2\").irbegin(\"<0 .5 .75>/2\").roomsize(.6)"
    ],
    "params": [
      {
        "name": "begin",
        "type": "string | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "iresponse",
    "description": "<p>Sets the sample to use as an impulse response for the reverb.</p>",
    "synonyms": [
      "ir"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(.8).ir(\"<shaker_large:0 shaker_large:2>\")"
    ],
    "params": [
      {
        "name": "sample",
        "type": "string | Pattern",
        "description": "<p>to use as an impulse response</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "irspeed",
    "description": "<p>Sets speed of the sample for the impulse response.</p>",
    "synonyms": [],
    "examples": [
      "samples('github:switchangel/pad')\n$: s(\"brk/2\").fit().scrub(irand(16).div(16).seg(8)).ir(\"swpad:4\").room(.2).irspeed(\"<2 1 .5>/2\").irbegin(.5).roomsize(.5)"
    ],
    "params": [
      {
        "name": "speed",
        "type": "string | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "juxBy",
    "description": "<p>Jux with adjustable stereo width. 0 = mono, 1 = full stereo.</p>",
    "synonyms": [
      "juxby"
    ],
    "examples": [
      "s(\"bd lt [~ ht] mt cp ~ bd hh\").juxBy(\"<0 .5 1>/2\", rev)"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "label",
    "description": "<p>Sets the displayed text for an event on the pianoroll</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "label",
        "type": "string",
        "description": "<p>text to display</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "leslie",
    "description": "<p>Emulation of a Leslie speaker: speakers rotating in a wooden amplified cabinet.</p>",
    "synonyms": [],
    "examples": [
      "n(\"0,4,7\").s(\"supersquare\").leslie(\"<0 .4 .6 1>\").osc()"
    ],
    "params": [
      {
        "name": "wet",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "lfo",
    "description": "<p>Configures an LFO. Can be called in sequence like pat.lfo(...).lfo(...) to set up multiple LFOs.\nThere are two ways to declare which control will be modulated:</p>\n<ol>\n<li>Explicitly put <code>control</code> in the config (e.g. <code>lfo({ c: &quot;lpf&quot; })</code>)</li>\n<li>If the control parameter is absent, the control <em>immediately before</em> the <code>lfo</code> call will be used\n(e.g. <code>s(&quot;saw&quot;).lpf(500).lfo()</code> to modulate <code>lpf</code>)</li>\n</ol>\n<p>Modulators can be referred to by <code>id</code> so that they can be updated later e.g. inside\na <code>sometimes</code>. See example below.</p>",
    "synonyms": [],
    "examples": [
      "s(\"saw\").note(\"F1\").lpf(500).lfo()",
      "s(\"saw\").lfo().lpf(500).lfo({ s: 0.3 })",
      "s(\"saw\").lpf(500).diode(0.3)\n  .lfo({ c: \"lpf\" })",
      "s(\"pulse\").lpf(500).lfo()\n  .lfo({ c: \"s\" })\n  .diode(0.3)\n  .sometimes(x => x.lfo({ s: \"8\" }, 1)) // lfo #1 (0-indexed)",
      "s(\"pulse\").lpf(500).lfo({ depth: 4 }, 'lpf_mod')\n  .lfo({ c: \"s\" })\n  .diode(0.3)\n  .sometimes(x => x.lfo({ s: \"8\" }, 'lpf_mod'))"
    ],
    "params": [
      {
        "name": "config",
        "type": "Object",
        "description": "<p>LFO configuration.</p>"
      },
      {
        "name": "config.control",
        "type": "string | Pattern",
        "description": "<p>Node to modulate. Aliases: c</p>"
      },
      {
        "name": "config.subControl",
        "type": "string | Pattern",
        "description": "<p>Sub-control name to append to the control key. Aliases: sc</p>"
      },
      {
        "name": "config.rate",
        "type": "number | Pattern",
        "description": "<p>Modulation rate. Aliases: r</p>"
      },
      {
        "name": "config.depth",
        "type": "number | Pattern",
        "description": "<p>Relative modulation depth. Aliases: dep, dr</p>"
      },
      {
        "name": "config.depthabs",
        "type": "number | Pattern",
        "description": "<p>Absolute modulation depth. Aliases: da</p>"
      },
      {
        "name": "config.dcoffset",
        "type": "number | Pattern",
        "description": "<p>DC offset / bias for the waveform. Aliases: dc</p>"
      },
      {
        "name": "config.shape",
        "type": "number | Pattern",
        "description": "<p>Shape index. Aliases: sh</p>"
      },
      {
        "name": "config.skew",
        "type": "number | Pattern",
        "description": "<p>Skew amount. Aliases: sk</p>"
      },
      {
        "name": "config.curve",
        "type": "number | Pattern",
        "description": "<p>Exponential curve amount. Aliases: cu</p>"
      },
      {
        "name": "config.sync",
        "type": "number | Pattern",
        "description": "<p>Tempo-synced modulation rate. Aliases: s</p>"
      },
      {
        "name": "config.fxi",
        "type": "number | Pattern",
        "description": "<p>FX index to target</p>"
      },
      {
        "name": "id",
        "type": "string | Pattern",
        "description": "<p>ID to use for this modulator</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lock",
    "description": "<p>Specifies whether delaytime is calculated relative to cps.</p>",
    "synonyms": [],
    "examples": [
      "s(\"sd\").delay().lock(1).osc()"
    ],
    "params": [
      {
        "name": "enable",
        "type": "number | Pattern",
        "description": "<p>When set to 1, delaytime is a direct multiple of a cycle.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "loop",
    "description": "<p>Loops the sample.\nNote that the tempo of the loop is not synced with the cycle tempo.\nTo change the loop region, use loopBegin / loopEnd.</p>",
    "synonyms": [],
    "examples": [
      "s(\"casio\").loop(1)"
    ],
    "params": [
      {
        "name": "on",
        "type": "number | Pattern",
        "description": "<p>If 1, the sample is looped</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "loopBegin",
    "description": "<p>Begin to loop at a specific point in the sample (inbetween <code>begin</code> and <code>end</code>).\nNote that the loop point must be inbetween <code>begin</code> and <code>end</code>, and before <code>loopEnd</code>!\nNote: Samples starting with wt_ will automatically loop! (wt = wavetable)</p>",
    "synonyms": [
      "loopb"
    ],
    "examples": [
      "s(\"space\").loop(1)\n.loopBegin(\"<0 .125 .25>\")._scope()"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1, where 1 is the length of the sample</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "loopEnd",
    "description": "<p>End the looping section at a specific point in the sample (inbetween <code>begin</code> and <code>end</code>).\nNote that the loop point must be inbetween <code>begin</code> and <code>end</code>, and after <code>loopBegin</code>!</p>",
    "synonyms": [
      "loope"
    ],
    "examples": [
      "s(\"space\").loop(1)\n.loopEnd(\"<1 .75 .5 .25>\")._scope()"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1, where 1 is the length of the sample</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpattack",
    "description": "<p>Sets the attack duration for the lowpass filter envelope.</p>",
    "synonyms": [
      "lpa"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.lpf(300)\n.lpa(\"<.5 .25 .1 .01>/4\")\n.lpenv(4)"
    ],
    "params": [
      {
        "name": "attack",
        "type": "number | Pattern",
        "description": "<p>time of the filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpdc",
    "description": "<p>DC offset of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "dcoffset",
        "type": "number | Pattern",
        "description": "<p>dc offset. set to 0 for unipolar</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpdecay",
    "description": "<p>Sets the decay duration for the lowpass filter envelope.</p>",
    "synonyms": [
      "lpd"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.lpf(300)\n.lpd(\"<.5 .25 .1 0>/4\")\n.lpenv(4)"
    ],
    "params": [
      {
        "name": "decay",
        "type": "number | Pattern",
        "description": "<p>time of the filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpdepth",
    "description": "<p>Depth of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).lpdepth(\"<1 .5 1.8 0>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpdepthfrequency",
    "description": "<p>Depth of the LFO for the lowpass filter, in HZ</p>",
    "synonyms": [
      "lpdepthfreq"
    ],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).lpdepthfrequency(\"<200 500 100 0>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpenv",
    "description": "<p>Sets the lowpass filter envelope modulation depth.</p>",
    "synonyms": [
      "lpe"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.lpf(300)\n.lpa(.5)\n.lpenv(\"<4 2 1 0 -1 -2 -4>/4\")"
    ],
    "params": [
      {
        "name": "modulation",
        "type": "number | Pattern",
        "description": "<p>depth of the lowpass filter envelope between 0 and <em>n</em></p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpf",
    "description": "<p>Applies the cutoff frequency of the <strong>l</strong>ow-<strong>p</strong>ass <strong>f</strong>ilter.</p>\n<p>When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.</p>",
    "synonyms": [
      "cutoff",
      "ctf",
      "lp"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*6\").lpf(\"<4000 2000 1000 500 200 100>\")",
      "s(\"bd*16\").lpf(\"1000:0 1000:10 1000:20 1000:30\")"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number | Pattern",
        "description": "<p>audible between 0 and 20000</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpq",
    "description": "<p>Controls the <strong>l</strong>ow-<strong>p</strong>ass <strong>q</strong>-value.</p>",
    "synonyms": [
      "resonance"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").lpf(2000).lpq(\"<0 10 20 30>\")"
    ],
    "params": [
      {
        "name": "q",
        "type": "number | Pattern",
        "description": "<p>resonance factor between 0 and 50</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lprate",
    "description": "<p>Rate of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).lprate(\"<4 8 2 1>\")"
    ],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lprelease",
    "description": "<p>Sets the release time for the lowpass filter envelope.</p>",
    "synonyms": [
      "lpr"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.clip(.5)\n.lpf(300)\n.lpenv(4)\n.lpr(\"<.5 .25 .1 0>/4\")\n.release(.5)"
    ],
    "params": [
      {
        "name": "release",
        "type": "number | Pattern",
        "description": "<p>time of the filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpshape",
    "description": "<p>Shape of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>Shape of the lfo (0, 1, 2, ..)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpskew",
    "description": "<p>Skew of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "skew",
        "type": "number | Pattern",
        "description": "<p>How much to bend the LFO shape</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpsustain",
    "description": "<p>Sets the sustain amplitude for the lowpass filter envelope.</p>",
    "synonyms": [
      "lps"
    ],
    "examples": [
      "note(\"c2 e2 f2 g2\")\n.sound('sawtooth')\n.lpf(300)\n.lpd(.5)\n.lps(\"<0 .25 .5 1>/4\")\n.lpenv(4)"
    ],
    "params": [
      {
        "name": "sustain",
        "type": "number | Pattern",
        "description": "<p>amplitude of the lowpass filter envelope</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lpsync",
    "description": "<p>Cycle-synced rate of the LFO for the lowpass filter</p>",
    "synonyms": [],
    "examples": [
      "note(\"<c c c# c c c4>*16\").s(\"sawtooth\").lpf(600).lpsync(\"<4 8 2 1>\")"
    ],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "lrate",
    "description": "<p>Rate of modulation / rotation for leslie effect</p>",
    "synonyms": [],
    "examples": [
      "n(\"0,4,7\").s(\"supersquare\").leslie(1).lrate(\"<1 2 4 8>\").osc()"
    ],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>6.7 for fast, 0.7 for slow</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "lsize",
    "description": "<p>Physical size of the cabinet in meters. Be careful, it might be slightly larger than your computer. Affects the Doppler amount (pitch warble)</p>",
    "synonyms": [],
    "examples": [
      "n(\"0,4,7\").s(\"supersquare\").leslie(1).lrate(2).lsize(\"<.1 .5 1>\").osc()"
    ],
    "params": [
      {
        "name": "meters",
        "type": "number | Pattern",
        "description": "<p>somewhere between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "markcss",
    "description": "<p>Overrides the css of highlighted events. Make sure to use single quotes!</p>",
    "synonyms": [],
    "examples": [
      "note(\"c a f e\")\n.markcss('text-decoration:underline')"
    ],
    "params": [],
    "file": "codemirror",
    "superdirtOnly": false
  },
  {
    "name": "midibend",
    "description": "<p>MIDI pitch bend: Sends a MIDI pitch bend message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").midibend(sine.slow(4).range(-0.4,0.4)).midi()"
    ],
    "params": [
      {
        "name": "midibend",
        "type": "number | Pattern",
        "description": "<p>MIDI pitch bend (-1 - 1)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "midichan",
    "description": "<p>MIDI channel: Sets the MIDI channel for the event.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").midichan(1).midi()"
    ],
    "params": [
      {
        "name": "channel",
        "type": "number | Pattern",
        "description": "<p>MIDI channel number (0-15)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "midicmd",
    "description": "<p>MIDI command: Sends a MIDI command message.</p>",
    "synonyms": [],
    "examples": [
      "midicmd(\"clock*48,<start stop>/2\").midi()"
    ],
    "params": [
      {
        "name": "command",
        "type": "number | Pattern",
        "description": "<p>MIDI command</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "midikeys",
    "description": "<p>MIDI keyboard: Opens a MIDI input port to receive MIDI keyboard messages.</p>\n<p>The note length is fixed as Superdough is not currently set up for undetermined\nnote durations</p>",
    "synonyms": [],
    "examples": [
      "const kb = await midikeys('Arturia KeyStep 32')\nkb().s(\"tri\").lpf(80).lpe(6).lpd(0.1).room(2).delay(0.35)",
      "const kb = await midikeys('Arturia KeyStep 32')\nkb(\"0.5 1\")\n  .s(\"saw\")\n  .add(note(rand.mul(0.3)))\n  .lpf(1000).lpe(2).room(0.5)"
    ],
    "params": [
      {
        "name": "input",
        "type": "string | number",
        "description": "<p>MIDI device name or index defaulting to 0</p>"
      }
    ],
    "file": "midi",
    "superdirtOnly": false
  },
  {
    "name": "midin",
    "description": "<p>MIDI input: Opens a MIDI input port to receive MIDI control change messages.</p>\n<p>The output is a function that accepts a midi cc value to query as well as (optionally) a midi channel</p>",
    "synonyms": [],
    "examples": [
      "const cc = await midin('IAC Driver Bus 1')\nnote(\"c a f e\").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound(\"sawtooth\")",
      "const allCC = await midin('IAC Driver Bus 1')\nconst cc = (ccNum) => allCC(ccNum, 2) // just channel 2\nnote(\"c a f e\").s(\"saw\")\n  .when(cc(0).gt(0), x => x.postgain(0))"
    ],
    "params": [
      {
        "name": "input",
        "type": "string | number",
        "description": "<p>MIDI device name or index defaulting to 0</p>"
      }
    ],
    "file": "midi",
    "superdirtOnly": false
  },
  {
    "name": "midiport",
    "description": "<p>MIDI port: Sets the MIDI port for the event.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c a f e\").midiport(\"<0 1 2 3>\").midi()"
    ],
    "params": [
      {
        "name": "port",
        "type": "number | Pattern",
        "description": "<p>MIDI port</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "miditouch",
    "description": "<p>MIDI key after touch: Sends a MIDI key after touch message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").miditouch(sine.slow(4).range(0,1)).midi()"
    ],
    "params": [
      {
        "name": "miditouch",
        "type": "number | Pattern",
        "description": "<p>MIDI key after touch (0-1)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "mode",
    "description": "<p>Remove anchor note from the voicing. Useful for melody harmonization</p>",
    "synonyms": [],
    "examples": [
      "mode(\"<below above duck root>\").chord(\"C\").voicing()"
    ],
    "params": [
      {
        "name": "modeName",
        "type": "string | Pattern",
        "description": "<p>one of {below | above | duck | root}</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "mousex",
    "description": "<p>The mouse's x position value ranges from 0 to 1.</p>",
    "synonyms": [],
    "examples": [
      "n(mousex.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "mousey",
    "description": "<p>The mouse's y position value ranges from 0 to 1.</p>",
    "synonyms": [],
    "examples": [
      "n(mousey.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "n",
    "description": "<p>Selects the given index from the sample map.\nNumbers too high will wrap around.\n<code>n</code> can also be used to play midi numbers, but it is recommended to use <code>note</code> instead.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*6\").n(\"<0 1>\")"
    ],
    "params": [
      {
        "name": "value",
        "type": "number | Pattern",
        "description": "<p>sample index starting from 0</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "noise",
    "description": "<p>Adds pink noise to the mix</p>",
    "synonyms": [],
    "examples": [
      "sound(\"<white pink brown>/2\")"
    ],
    "params": [
      {
        "name": "wet",
        "type": "number | Pattern",
        "description": "<p>wet amount</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "note",
    "description": "<p>Plays the given note name or midi number. A note name consists of</p>\n<ul>\n<li>a letter (a-g or A-G)</li>\n<li>optional accidentals (b or #)</li>\n<li>optional (possibly negative) octave number (0-9). Defaults to 3</li>\n</ul>\n<p>Examples of valid note names: <code>c</code>, <code>bb</code>, <code>Bb</code>, <code>f#</code>, <code>c3</code>, <code>A4</code>, <code>Eb2</code>, <code>c#5</code></p>\n<p>You can also use midi numbers instead of note names, where 69 is mapped to A4 440Hz in 12EDO.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c a f e\")",
      "note(\"c4 a4 f4 e4\")",
      "note(\"60 69 65 64\")",
      "note(\"fbb1 a#0 cbbb-1 e##-2\").sound(\"saw\")"
    ],
    "params": [],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "nrpnn",
    "description": "<p>MIDI NRPN non-registered parameter number: Sends a MIDI NRPN non-registered parameter number message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").nrpnn(\"1:8\").nrpv(\"123\").midichan(1).midi()"
    ],
    "params": [
      {
        "name": "nrpnn",
        "type": "number | Pattern",
        "description": "<p>MIDI NRPN non-registered parameter number (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "nrpv",
    "description": "<p>MIDI NRPN non-registered parameter value: Sends a MIDI NRPN non-registered parameter value message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").nrpnn(\"1:8\").nrpv(\"123\").midichan(1).midi()"
    ],
    "params": [
      {
        "name": "nrpv",
        "type": "number | Pattern",
        "description": "<p>MIDI NRPN non-registered parameter value (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "octave",
    "description": "<p>Sets the default octave of a synth.</p>",
    "synonyms": [
      "oct"
    ],
    "examples": [
      "n(\"0,4,7\").scale(\"F:minor\").s('supersaw').octave(\"<0 1 2 3>\")"
    ],
    "params": [
      {
        "name": "octave",
        "type": "number | Pattern",
        "description": "<p>octave number</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "octaves",
    "description": "<p>How many octaves are voicing steps spread apart, defaults to 1</p>",
    "synonyms": [],
    "examples": [
      "chord(\"<Am C D F Am E Am E>\").octaves(\"<2 4>\").voicing()"
    ],
    "params": [
      {
        "name": "count",
        "type": "number | Pattern",
        "description": "<p>the number of octaves</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "offset",
    "description": "<p>Sets how the voicing is offset from the anchored position</p>",
    "synonyms": [],
    "examples": [
      "chord(\"<Am C D F Am E Am E>\").offset(\"<0 1 2 3 4 5>\") // alter the voicing each time"
    ],
    "params": [
      {
        "name": "shift",
        "type": "number | Pattern",
        "description": "<p>the amount to shift the voicing up or down</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "orbit",
    "description": "<p>An <code>orbit</code> is a global parameter context for patterns. Patterns with the same orbit will share the same global effects.</p>",
    "synonyms": [
      "o"
    ],
    "examples": [
      "stack(\n  s(\"hh*6\").delay(.5).delaytime(.25).orbit(1),\n  s(\"~ sd ~ sd\").delay(.5).delaytime(.125).orbit(2)\n)"
    ],
    "params": [
      {
        "name": "number",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "orientationAlpha",
    "description": "<p>The device's orientation alpha value ranges from 0 to 1.</p>",
    "synonyms": [
      "oriA",
      "oriZ",
      "orientationZ"
    ],
    "examples": [
      "n(orientationAlpha.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "orientationBeta",
    "description": "<p>The device's orientation beta value ranges from 0 to 1.</p>",
    "synonyms": [
      "oriB",
      "oriX",
      "orientationX"
    ],
    "examples": [
      "n(orientationBeta.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "orientationGamma",
    "description": "<p>The device's orientation gamma value ranges from 0 to 1.</p>",
    "synonyms": [
      "oriG",
      "oriY",
      "orientationY"
    ],
    "examples": [
      "n(orientationGamma.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "oschost",
    "description": "<p>The host to send open sound control messages to. Requires running the OSC bridge.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").oschost('127.0.0.1').oscport(57120).osc();"
    ],
    "params": [
      {
        "name": "oschost",
        "type": "string | Pattern",
        "description": "<p>e.g. 'localhost'</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "oscport",
    "description": "<p>The port to send open sound control messages to. Requires running the OSC bridge.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").oschost('127.0.0.1').oscport(57120).osc();"
    ],
    "params": [
      {
        "name": "oscport",
        "type": "number | Pattern",
        "description": "<p>e.g. 57120</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pan",
    "description": "<p>Sets position in stereo.</p>",
    "synonyms": [],
    "examples": [
      "s(\"[bd hh]*2\").pan(\"<.5 1 .5 0>\")",
      "s(\"bd rim sd rim bd ~ cp rim\").pan(sine.slow(2))"
    ],
    "params": [
      {
        "name": "pan",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1, from left to right (assuming stereo), once round a circle (assuming multichannel)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "panchor",
    "description": "<p>Sets the range anchor of the envelope:</p>\n<ul>\n<li>anchor 0: range = [note, note + penv]</li>\n<li>anchor 1: range = [note - penv, note]\nIf you don't set an anchor, the value will default to the psustain value.</li>\n</ul>",
    "synonyms": [],
    "examples": [
      "note(\"c c4\").penv(12).panchor(\"<0 .5 1 .5>\")"
    ],
    "params": [
      {
        "name": "anchor",
        "type": "number | Pattern",
        "description": "<p>anchor offset</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "parray",
    "description": "<p>Turns a list of patterns into a single pattern which outputs list-values</p>",
    "synonyms": [],
    "examples": [],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "partials",
    "description": "<p>Scale the magnitude of the harmonics of one of the core synths ('sine', 'tri', 'saw', ..)</p>\n<p>Can also be used to create a new synth via <code>s('user').partials(...)</code></p>",
    "synonyms": [],
    "examples": [
      "s(\"user\").seg(16).n(irand(8)).scale(\"A:major\")\n  .partials([1, 0, 1, 0, 0, 1])",
      "s(\"saw\").seg(8).n(irand(12)).scale(\"G#:minor\")\n  .partials(binaryL(irand(256).add(\"1\")))"
    ],
    "params": [
      {
        "name": "magnitudes",
        "type": "Array.<number> | Pattern",
        "description": "<p>List of [0, 1] magnitudes for partials. 0th entry is the fundamental harmonic (i.e. DC offset is skipped)</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "pattack",
    "description": "<p>Attack time of pitch envelope.</p>",
    "synonyms": [
      "patt"
    ],
    "examples": [
      "note(\"c eb g bb\").pattack(\"0 .1 .25 .5\").slow(2)"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pcurve",
    "description": "<p>Curve of envelope. Defaults to linear. exponential is good for kicks</p>",
    "synonyms": [],
    "examples": [
      "note(\"g1*4\")\n.s(\"sine\").pdec(.5)\n.penv(32)\n.pcurve(\"<0 1>\")"
    ],
    "params": [
      {
        "name": "type",
        "type": "number | Pattern",
        "description": "<p>0 = linear, 1 = exponential</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pdecay",
    "description": "<p>Decay time of pitch envelope.</p>",
    "synonyms": [
      "pdec"
    ],
    "examples": [
      "note(\"<c eb g bb>\").pdecay(\"<0 .1 .25 .5>\")"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "penv",
    "description": "<p>Amount of pitch envelope. Negative values will flip the envelope.\nIf you don't set other pitch envelope controls, <code>pattack:.2</code> will be the default.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c\")\n.penv(\"<12 7 1 .5 0 -1 -7 -12>\")"
    ],
    "params": [
      {
        "name": "semitones",
        "type": "number | Pattern",
        "description": "<p>change in semitones</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "perlin",
    "description": "<p>Generates a continuous pattern of <a href=\"https://en.wikipedia.org/wiki/Perlin_noise\">perlin noise</a>, in the range 0..1.</p>",
    "synonyms": [],
    "examples": [
      "// randomly change the cutoff\ns(\"bd*4,hh*8\").cutoff(perlin.range(500,8000))"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "phaser",
    "description": "<p>Phaser audio effect that approximates popular guitar pedals.</p>",
    "synonyms": [
      "ph"
    ],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"sawtooth\").release(0.5)\n.phaser(\"<1 2 4 8>\")"
    ],
    "params": [
      {
        "name": "speed",
        "type": "number | Pattern",
        "description": "<p>speed of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "phasercenter",
    "description": "<p>The center frequency of the phaser in HZ. Defaults to 1000</p>",
    "synonyms": [
      "phc"
    ],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"sawtooth\").release(0.5)\n.phaser(2).phasercenter(\"<800 2000 4000>\")"
    ],
    "params": [
      {
        "name": "centerfrequency",
        "type": "number | Pattern",
        "description": "<p>in HZ</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "phaserdepth",
    "description": "<p>The amount the signal is affected by the phaser effect. Defaults to 0.75</p>",
    "synonyms": [
      "phd",
      "phasdp"
    ],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"sawtooth\").release(0.5)\n.phaser(2).phaserdepth(\"<0 .5 .75 1>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>number between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "phasersweep",
    "description": "<p>The frequency sweep range of the lfo for the phaser effect. Defaults to 2000</p>",
    "synonyms": [
      "phs"
    ],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"sawtooth\").release(0.5)\n.phaser(2).phasersweep(\"<800 2000 4000>\")"
    ],
    "params": [
      {
        "name": "phasersweep",
        "type": "number | Pattern",
        "description": "<p>most useful values are between 0 and 4000</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "phases",
    "description": "<p>Rotates the harmonics of one of the core synths ('sine', 'tri', 'saw', 'user', ..) by a list of phases</p>",
    "synonyms": [],
    "examples": [
      "// Phase cancellation\ns(\"saw\").seg(8).n(irand(12)).scale(\"G#1:minor\")\n  .partials(partials([1, 1, 1]))\n  .superimpose(x => x.phases([0.5, 0.5, 0.5]))"
    ],
    "params": [
      {
        "name": "phases",
        "type": "Array.<number> | Pattern",
        "description": "<p>List of [0, 1) phases for partials. 0th entry is the fundamental phase (i.e. DC offset is skipped)</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "pianoroll",
    "description": "<p>Visualises a pattern as a scrolling 'pianoroll', displayed in the background of the editor. To show a pianoroll for all running patterns, use <code>all(pianoroll)</code>. To have a pianoroll appear below\na pattern instead, prefix with <code>_</code>, e.g.: <code>sound(&quot;bd sd&quot;)._pianoroll()</code>.</p>",
    "synonyms": [
      "punchcard"
    ],
    "examples": [
      "note(\"c2 a2 eb2\")\n.euclid(5,8)\n.s('sawtooth')\n.lpenv(4).lpf(300)\n.pianoroll({ labels: 1 })"
    ],
    "params": [
      {
        "name": "options",
        "type": "Object",
        "description": "<p>Object containing all the optional following parameters as key value pairs:</p>"
      },
      {
        "name": "cycles",
        "type": "integer",
        "description": "<p>number of cycles to be displayed at the same time - defaults to 4</p>"
      },
      {
        "name": "playhead",
        "type": "number",
        "description": "<p>location of the active notes on the time axis - 0 to 1, defaults to 0.5</p>"
      },
      {
        "name": "vertical",
        "type": "boolean",
        "description": "<p>displays the roll vertically - 0 by default</p>"
      },
      {
        "name": "labels",
        "type": "boolean",
        "description": "<p>displays labels on individual notes (see the label function) - 0 by default</p>"
      },
      {
        "name": "flipTime",
        "type": "boolean",
        "description": "<p>reverse the direction of the roll - 0 by default</p>"
      },
      {
        "name": "flipValues",
        "type": "boolean",
        "description": "<p>reverse the relative location of notes on the value axis - 0 by default</p>"
      },
      {
        "name": "overscan",
        "type": "number",
        "description": "<p>lookup X cycles outside of the cycles window to display notes in advance - 1 by default</p>"
      },
      {
        "name": "hideNegative",
        "type": "boolean",
        "description": "<p>hide notes with negative time (before starting playing the pattern) - 0 by default</p>"
      },
      {
        "name": "smear",
        "type": "boolean",
        "description": "<p>notes leave a solid trace - 0 by default</p>"
      },
      {
        "name": "fold",
        "type": "boolean",
        "description": "<p>notes takes the full value axis width - 0 by default</p>"
      },
      {
        "name": "active",
        "type": "string",
        "description": "<p>hexadecimal or CSS color of the active notes - defaults to #FFCA28</p>"
      },
      {
        "name": "inactive",
        "type": "string",
        "description": "<p>hexadecimal or CSS color of the inactive notes - defaults to #7491D2</p>"
      },
      {
        "name": "background",
        "type": "string",
        "description": "<p>hexadecimal or CSS color of the background - defaults to transparent</p>"
      },
      {
        "name": "playheadColor",
        "type": "string",
        "description": "<p>hexadecimal or CSS color of the line representing the play head - defaults to white</p>"
      },
      {
        "name": "fill",
        "type": "boolean",
        "description": "<p>notes are filled with color (otherwise only the label is displayed) - 0 by default</p>"
      },
      {
        "name": "fillActive",
        "type": "boolean",
        "description": "<p>active notes are filled with color - 0 by default</p>"
      },
      {
        "name": "stroke",
        "type": "boolean",
        "description": "<p>notes are shown with colored borders - 0 by default</p>"
      },
      {
        "name": "strokeActive",
        "type": "boolean",
        "description": "<p>active notes are shown with colored borders - 0 by default</p>"
      },
      {
        "name": "hideInactive",
        "type": "boolean",
        "description": "<p>only active notes are shown - 0 by default</p>"
      },
      {
        "name": "colorizeInactive",
        "type": "boolean",
        "description": "<p>use note color for inactive notes - 1 by default</p>"
      },
      {
        "name": "fontFamily",
        "type": "string",
        "description": "<p>define the font used by notes labels - defaults to 'monospace'</p>"
      },
      {
        "name": "minMidi",
        "type": "integer",
        "description": "<p>minimum note value to display on the value axis - defaults to 10</p>"
      },
      {
        "name": "maxMidi",
        "type": "integer",
        "description": "<p>maximum note value to display on the value axis - defaults to 90</p>"
      },
      {
        "name": "autorange",
        "type": "boolean",
        "description": "<p>automatically calculate the minMidi and maxMidi parameters - 0 by default</p>"
      }
    ],
    "file": "pianoroll",
    "superdirtOnly": false
  },
  {
    "name": "pitchwheel",
    "description": "<p>Renders a pitch circle to visualize frequencies within one octave</p>",
    "synonyms": [],
    "examples": [
      "n(\"0 .. 12\").scale(\"C:chromatic\")\n.s(\"sawtooth\")\n.lpf(500)\n._pitchwheel()"
    ],
    "params": [
      {
        "name": "hapcircles",
        "type": "number",
        "description": ""
      },
      {
        "name": "circle",
        "type": "number",
        "description": ""
      },
      {
        "name": "edo",
        "type": "number",
        "description": ""
      },
      {
        "name": "root",
        "type": "string",
        "description": ""
      },
      {
        "name": "thickness",
        "type": "number",
        "description": ""
      },
      {
        "name": "hapRadius",
        "type": "number",
        "description": ""
      },
      {
        "name": "mode",
        "type": "string",
        "description": ""
      },
      {
        "name": "margin",
        "type": "number",
        "description": ""
      }
    ],
    "file": "pitchwheel",
    "superdirtOnly": false
  },
  {
    "name": "plyForEach",
    "description": "<p>The plyForEach function repeats each event the given number of times, applying the given function to each event.\nThis version of ply uses the iteration index as an argument to the function, similar to echoWith.</p>",
    "synonyms": [
      "plyforeach"
    ],
    "examples": [
      "\"<0 [2 4]>\"\n.plyForEach(4, (p,n) => p.add(n*2))\n.scale(\"C:minor\").note()"
    ],
    "params": [
      {
        "name": "factor",
        "type": "number",
        "description": "<p>how many times to repeat</p>"
      },
      {
        "name": "func",
        "type": "function",
        "description": "<p>function to apply, given the pattern and the iteration index</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "plyWith",
    "description": "<p>The plyWith function repeats each event the given number of times, applying the given function to each event.\\n</p>",
    "synonyms": [
      "plywith"
    ],
    "examples": [
      "\"<0 [2 4]>\"\n.plyWith(4, (p) => p.add(2))\n.scale(\"C:minor\").note()"
    ],
    "params": [
      {
        "name": "factor",
        "type": "number",
        "description": "<p>how many times to repeat</p>"
      },
      {
        "name": "func",
        "type": "function",
        "description": "<p>function to apply, given the pattern</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "postgain",
    "description": "<p>Gain applied after all effects have been processed.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\")\n.compressor(\"-20:20:10:.002:.02\").postgain(1.5)"
    ],
    "params": [],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "prelease",
    "description": "<p>Release time of pitch envelope</p>",
    "synonyms": [
      "prel"
    ],
    "examples": [
      "note(\"<c eb g bb> ~\")\n.release(.5) // to hear the pitch release\n.prelease(\"<0 .1 .25 .5>\")"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "progNum",
    "description": "<p>MIDI program number: Sends a MIDI program change message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").progNum(10).midichan(1).midi()"
    ],
    "params": [
      {
        "name": "program",
        "type": "number | Pattern",
        "description": "<p>MIDI program number (0-127)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pw",
    "description": "<p>Controls the pulsewidth of the pulse oscillator</p>",
    "synonyms": [],
    "examples": [
      "note(\"{f a c e}%16\").s(\"pulse\").pw(\".8:1:.2\")",
      "n(run(8)).scale(\"D:pentatonic\").s(\"pulse\").pw(\"0 .75 .5 1\")"
    ],
    "params": [
      {
        "name": "pulsewidth",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pwrate",
    "description": "<p>Controls the lfo rate for the pulsewidth of the pulse oscillator</p>",
    "synonyms": [],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"pulse\").pw(\"0.5\").pwrate(\"<5 .1 25>\").pwsweep(\"<0.3 .8>\")"
    ],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "pwsweep",
    "description": "<p>Controls the lfo sweep for the pulsewidth of the pulse oscillator</p>",
    "synonyms": [],
    "examples": [
      "n(run(8)).scale(\"D:pentatonic\").s(\"pulse\").pw(\"0.5\").pwrate(\"<5 .1 25>\").pwsweep(\"<0.3 .8>\")"
    ],
    "params": [
      {
        "name": "sweep",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "rand",
    "description": "<p>A continuous pattern of random numbers, between 0 and 1.</p>",
    "synonyms": [],
    "examples": [
      "// randomly change the cutoff\ns(\"bd*4,hh*8\").cutoff(rand.range(500,8000))"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "randL",
    "description": "<p>Creates a list of random numbers of the given length</p>",
    "synonyms": [],
    "examples": [
      "s(\"saw\").seg(16).n(irand(12)).scale(\"F1:minor\")\n  .partials(randL(8))"
    ],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>Number of random numbers to sample</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "release",
    "description": "<p>Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.</p>",
    "synonyms": [
      "rel"
    ],
    "examples": [
      "note(\"c3 e3 g3 c4\").release(\"<0 .1 .4 .6 1>/2\")"
    ],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>release time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "ribbon",
    "description": "<p>Loops the pattern inside an <code>offset</code> for <code>cycles</code>.\nIf you think of the entire span of time in cycles as a ribbon, you can cut a single piece and loop it.</p>",
    "synonyms": [
      "rib"
    ],
    "examples": [
      "note(\"<c d e f>\").ribbon(1, 2)",
      "// Looping a portion of randomness\nn(irand(8).segment(4)).scale(\"c:pentatonic\").ribbon(1337, 2)",
      "// rhythm generator\ns(\"bd!16?\").ribbon(29,.5)"
    ],
    "params": [
      {
        "name": "offset",
        "type": "number",
        "description": "<p>start point of loop in cycles</p>"
      },
      {
        "name": "cycles",
        "type": "number",
        "description": "<p>loop length in cycles</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "room",
    "description": "<p>Sets the level of reverb.</p>\n<p>When using mininotation, you can also optionally add the 'size' parameter, separated by ':'.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(\"<0 .2 .4 .6 .8 1>\")",
      "s(\"bd sd [~ bd] sd\").room(\"<0.9:1 0.9:4>\")"
    ],
    "params": [
      {
        "name": "level",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "roomdim",
    "description": "<p>Reverb lowpass frequency at -60dB (in hertz).\nWhen this property is changed, the reverb will be recaculated, so only change this sparsely..</p>",
    "synonyms": [
      "rdim"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(10000).rdim(8000)",
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(5000).rdim(400)"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number",
        "description": "<p>between 0 and 20000hz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "roomfade",
    "description": "<p>Reverb fade time (in seconds).\nWhen this property is changed, the reverb will be recaculated, so only change this sparsely..</p>",
    "synonyms": [
      "rfade"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(10000).rfade(0.5)",
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(5000).rfade(4)"
    ],
    "params": [
      {
        "name": "seconds",
        "type": "number",
        "description": "<p>for the reverb to fade</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "roomlp",
    "description": "<p>Reverb lowpass starting frequency (in hertz).\nWhen this property is changed, the reverb will be recaculated, so only change this sparsely..</p>",
    "synonyms": [
      "rlp"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(10000)",
      "s(\"bd sd [~ bd] sd\").room(0.5).rlp(5000)"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number",
        "description": "<p>between 0 and 20000hz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "roomsize",
    "description": "<p>Sets the room size of the reverb, see <code>room</code>.\nWhen this property is changed, the reverb will be recaculated, so only change this sparsely..</p>",
    "synonyms": [
      "rsize",
      "sz",
      "size"
    ],
    "examples": [
      "s(\"bd sd [~ bd] sd\").room(.8).rsize(1)",
      "s(\"bd sd [~ bd] sd\").room(.8).rsize(4)"
    ],
    "params": [
      {
        "name": "size",
        "type": "number | Pattern",
        "description": "<p>between 0 and 10</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "rotationAlpha",
    "description": "<p>The device's rotation around the alpha-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "rotA",
      "rotZ",
      "rotationZ"
    ],
    "examples": [
      "n(rotationAlpha.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "rotationBeta",
    "description": "<p>The device's rotation around the beta-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "rotB",
      "rotX",
      "rotationX"
    ],
    "examples": [
      "n(rotationBeta.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "rotationGamma",
    "description": "<p>The device's rotation around the gamma-axis value ranges from 0 to 1.</p>",
    "synonyms": [
      "rotG",
      "rotY",
      "rotationY"
    ],
    "examples": [
      "n(rotationGamma.segment(4).range(0,7)).scale(\"C:minor\")"
    ],
    "params": [],
    "file": "motion",
    "superdirtOnly": false
  },
  {
    "name": "s",
    "description": "<p>Select a sound / sample by name. When using mininotation, you can also optionally supply 'n' and 'gain' parameters\nseparated by ':'.</p>",
    "synonyms": [
      "sound"
    ],
    "examples": [
      "s(\"bd hh\")",
      "s(\"bd:0 bd:1 bd:0:0.3 bd:1:1.4\")"
    ],
    "params": [
      {
        "name": "sound",
        "type": "string | Pattern",
        "description": "<p>The sound / pattern of sounds to pick</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "scale",
    "description": "<p>Turns numbers into notes in the scale (zero indexed) or quantizes notes to a scale.</p>\n<p>When describing notes via numbers, note that negative numbers can be used to wrap backwards\nin the scale as well as sharps or flats to produce notes outside of the scale.</p>\n<p>Also sets scale for other scale operations, like {@link Pattern#scaleTranspose}.</p>\n<p>A scale consists of a root note (e.g. <code>c4</code>, <code>c</code>, <code>f#</code>, <code>bb4</code>) followed by semicolon (':') and then a <a href=\"https://github.com/tonaljs/tonal/blob/main/packages/scale-type/data.ts\">scale type</a>.</p>\n<p>The scale name must be written without spaces (because it would be interpreted as a multi-step pattern otherwise).\nIf your scale name includes spaces, replace them with colons.</p>\n<p>The root note defaults to octave 3, if no octave number is given.</p>",
    "synonyms": [],
    "examples": [
      "n(\"0 2 4 6 4 2\").scale(\"C:major\")",
      "n(\"[0,7] 4 [2,7] 4\")\n.scale(\"C:<major minor>/2\")\n.s(\"piano\")",
      "n(rand.range(0,12).segment(8))\n.scale(\"C:ritusen\")\n.s(\"piano\")",
      "n(\"<[0,7b] [-4# -4] [-2,7##] 4 [0,7] [-4# -4b] [-2,7###] 4b>*4\")\n.scale(\"C:<major minor>/2\")\n.s(\"piano\")",
      "note(\"C1*16\").transpose(irand(36)).scale('Cb2 major').scaleTranspose(3)",
      "n(\"[0 0] [1 2] [3 4] [5 6]\").scale(\"C:major:blues\")"
    ],
    "params": [
      {
        "name": "scale",
        "type": "string",
        "description": "<p>Name of scale</p>"
      }
    ],
    "file": "tonal",
    "superdirtOnly": false
  },
  {
    "name": "scope",
    "description": "<p>Renders an oscilloscope for the time domain of the audio signal.</p>",
    "synonyms": [
      "tscope"
    ],
    "examples": [
      "s(\"sawtooth\")._scope()"
    ],
    "params": [
      {
        "name": "config",
        "type": "object",
        "description": "<p>optional config with options:</p>"
      },
      {
        "name": "align",
        "type": "boolean",
        "description": "<p>if 1, the scope will be aligned to the first zero crossing. defaults to 1</p>"
      },
      {
        "name": "color",
        "type": "string",
        "description": "<p>line color as hex or color name. defaults to white.</p>"
      },
      {
        "name": "thickness",
        "type": "number",
        "description": "<p>line thickness. defaults to 3</p>"
      },
      {
        "name": "scale",
        "type": "number",
        "description": "<p>scales the y-axis. Defaults to 0.25</p>"
      },
      {
        "name": "pos",
        "type": "number",
        "description": "<p>y-position relative to screen height. 0 = top, 1 = bottom of screen</p>"
      },
      {
        "name": "trigger",
        "type": "number",
        "description": "<p>amplitude value that is used to align the scope. defaults to 0.</p>"
      }
    ],
    "file": "scope",
    "superdirtOnly": false
  },
  {
    "name": "scramble",
    "description": "<p>Slices a pattern into the given number of parts, then plays those parts at random. Similar to <code>shuffle</code>,\nbut parts might be played more than once, or not at all, per cycle.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c d e f\").sound(\"piano\").scramble(4)",
      "seq(\"c d e f\".scramble(4), \"g\").note().sound(\"piano\")"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "seed",
    "description": "<p>Change the seed for random signals. Normally, random signals depend on time,\nso two patterns at the same time will have the same random values. Specifying\na new seed changes the signal output by <code>rand</code>. This also affects other functions\nthat use randomness, like <code>shuffle</code> and <code>sometimes</code>.</p>",
    "synonyms": [],
    "examples": [
      "$: s(\"hh*4\").degrade();\n$: s(\"bd*4\").degrade().seed(1); // Will degrade different events from the hi-hat"
    ],
    "params": [
      {
        "name": "n",
        "type": "number",
        "description": "<p>A new seed. Can be any number.</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "segment",
    "description": "<p>Samples the pattern at a rate of n events per cycle. Useful for turning a continuous pattern into a discrete one.</p>",
    "synonyms": [
      "seg"
    ],
    "examples": [
      "note(saw.range(40,52).segment(24))"
    ],
    "params": [
      {
        "name": "segments",
        "type": "number",
        "description": "<p>number of segments per cycle</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "setcpm",
    "description": "<p>Changes the global tempo to the given cycles per minute</p>",
    "synonyms": [],
    "examples": [
      "setcpm(140/4) // =140 bpm in 4/4\n$: s(\"bd*4,[- sd]*2\").bank('tr707')"
    ],
    "params": [
      {
        "name": "cpm",
        "type": "number",
        "description": "<p>cycles per minute</p>"
      }
    ],
    "file": "repl",
    "superdirtOnly": false
  },
  {
    "name": "setGainCurve",
    "description": "<p>Apply a function to all gains provided in patterns. Can be used to rescale gain to be\nquadratic, exponential, etc. rather than linear</p>",
    "synonyms": [],
    "examples": [
      "setGainCurve((x) => x * x) // quadratic gain\ns(\"bd*4\").gain(0.5) // equivalent to 0.25 gain normally"
    ],
    "params": [
      {
        "name": "function",
        "type": "function",
        "description": "<p>to apply to all gain values</p>"
      }
    ],
    "file": "superdough",
    "superdirtOnly": false
  },
  {
    "name": "setMaxPolyphony",
    "description": "<p>Set the max polyphony. If notes are ringing out via <code>release</code> then they will\nstart to die out in first-in-first-out order once the max polyphony has been hit</p>",
    "synonyms": [],
    "examples": [
      "setMaxPolyphony(4)\nn(irand(24).seg(8)).scale(\"C#3:minor\").room(1).release(4).gain(0.5)"
    ],
    "params": [
      {
        "name": "Max",
        "type": "number",
        "description": "<p>polyphony. Defaults to 128</p>"
      }
    ],
    "file": "superdough",
    "superdirtOnly": false
  },
  {
    "name": "shape",
    "description": "<p>(Deprecated) Wave shaping distortion. WARNING: can suddenly get unpredictably loud.\nPlease use distort instead, which has a more predictable response curve\nsecond option in optional array syntax (ex: &quot;.9:.5&quot;) applies a postgain to the output</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd [~ bd] sd,hh*8\").shape(\"<0 .2 .4 .6 .8>\")"
    ],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "shuffle",
    "description": "<p>Slices a pattern into the given number of parts, then plays those parts in random order.\nEach part will be played exactly once per cycle.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c d e f\").sound(\"piano\").shuffle(4)",
      "seq(\"c d e f\".shuffle(4), \"g\").note().sound(\"piano\")"
    ],
    "params": [],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "silence",
    "description": "<p>Does absolutely nothing..</p>",
    "synonyms": [],
    "examples": [
      "silence // \"~\""
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "sinefold",
    "description": "<p>Wavefolding distortion composed with sinusoid</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "slider",
    "description": "<p>Displays a slider widget to allow the user manipulate a value</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "value",
        "type": "number",
        "description": "<p>Initial value</p>"
      },
      {
        "name": "min",
        "type": "number",
        "description": "<p>Minimum value - optional, defaults to 0</p>"
      },
      {
        "name": "max",
        "type": "number",
        "description": "<p>Maximum value - optional, defaults to 1</p>"
      },
      {
        "name": "step",
        "type": "number",
        "description": "<p>Step size - optional</p>"
      }
    ],
    "file": "slider",
    "superdirtOnly": false
  },
  {
    "name": "soft",
    "description": "<p>Soft-clipping distortion</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "distortion",
        "type": "number | Pattern",
        "description": "<p>amount of distortion to apply</p>"
      },
      {
        "name": "volume",
        "type": "number | Pattern",
        "description": "<p>linear postgain of the distortion</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "source",
    "description": "<p>Define a custom webaudio node to use as a sound source.</p>",
    "synonyms": [
      "src"
    ],
    "examples": [],
    "params": [
      {
        "name": "getSource",
        "type": "function",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "spectrum",
    "description": "<p>Renders a spectrum analyzer for the incoming audio signal.</p>",
    "synonyms": [],
    "examples": [
      "n(\"<0 4 <2 3> 1>*3\")\n.off(1/8, add(n(5)))\n.off(1/5, add(n(7)))\n.scale(\"d3:minor:pentatonic\")\n.s('sine')\n.dec(.3).room(.5)\n._spectrum()"
    ],
    "params": [
      {
        "name": "config",
        "type": "object",
        "description": "<p>optional config with options:</p>"
      },
      {
        "name": "thickness",
        "type": "integer",
        "description": "<p>line thickness in px (default 3)</p>"
      },
      {
        "name": "speed",
        "type": "integer",
        "description": "<p>scroll speed (default 1)</p>"
      },
      {
        "name": "min",
        "type": "integer",
        "description": "<p>min db (default -80)</p>"
      },
      {
        "name": "max",
        "type": "integer",
        "description": "<p>max db (default 0)</p>"
      }
    ],
    "file": "spectrum",
    "superdirtOnly": false
  },
  {
    "name": "speed",
    "description": "<p>Changes the speed of sample playback, i.e. a cheap way of changing pitch.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd*6\").speed(\"1 2 4 1 -2 -4\")",
      "speed(\"1 1.5*2 [2 1.1]\").s(\"piano\").clip(1)"
    ],
    "params": [
      {
        "name": "speed",
        "type": "number | Pattern",
        "description": "<p>inf to inf, negative numbers play the sample backwards.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "spiral",
    "description": "<p>Displays a spiral visual.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c2 a2 eb2\")\n.euclid(5,8)\n.s('sawtooth')\n.lpenv(4).lpf(300)\n._spiral({ steady: .96 })"
    ],
    "params": [
      {
        "name": "options",
        "type": "Object",
        "description": "<p>Object containing all the optional following parameters as key value pairs:</p>"
      },
      {
        "name": "stretch",
        "type": "number",
        "description": "<p>controls the rotations per cycle ratio, where 1 = 1 cycle / 360 degrees</p>"
      },
      {
        "name": "size",
        "type": "number",
        "description": "<p>the diameter of the spiral</p>"
      },
      {
        "name": "thickness",
        "type": "number",
        "description": "<p>line thickness</p>"
      },
      {
        "name": "cap",
        "type": "string",
        "description": "<p>style of line ends: butt (default), round, square</p>"
      },
      {
        "name": "inset",
        "type": "string",
        "description": "<p>number of rotations before spiral starts (default 3)</p>"
      },
      {
        "name": "playheadColor",
        "type": "string",
        "description": "<p>color of playhead, defaults to white</p>"
      },
      {
        "name": "playheadLength",
        "type": "number",
        "description": "<p>length of playhead in rotations, defaults to 0.02</p>"
      },
      {
        "name": "playheadThickness",
        "type": "number",
        "description": "<p>thickness of playheadrotations, defaults to thickness</p>"
      },
      {
        "name": "padding",
        "type": "number",
        "description": "<p>space around spiral</p>"
      },
      {
        "name": "steady",
        "type": "number",
        "description": "<p>steadyness of spiral vs playhead. 1 = spiral doesn't move, playhead does.</p>"
      },
      {
        "name": "activeColor",
        "type": "number",
        "description": "<p>color of active segment. defaults to foreground of theme</p>"
      },
      {
        "name": "inactiveColor",
        "type": "number",
        "description": "<p>color of inactive segments. defaults to gutterForeground of theme</p>"
      },
      {
        "name": "colorizeInactive",
        "type": "boolean",
        "description": "<p>wether or not to colorize inactive segments, defaults to 0</p>"
      },
      {
        "name": "fade",
        "type": "boolean",
        "description": "<p>wether or not past and future should fade out. defaults to 1</p>"
      },
      {
        "name": "logSpiral",
        "type": "boolean",
        "description": "<p>wether or not the spiral should be logarithmic. defaults to 0</p>"
      }
    ],
    "file": "spiral",
    "superdirtOnly": false
  },
  {
    "name": "splice",
    "description": "<p>Works the same as slice, but changes the playback speed of each slice to match the duration of its step.</p>",
    "synonyms": [],
    "examples": [
      "samples('github:tidalcycles/dirt-samples')\ns(\"breaks165\")\n.splice(8,  \"0 1 [2 3 0]@2 3 0@2 7\")"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "spread",
    "description": "<p>Set the stereo pan spread for supported oscillators</p>",
    "synonyms": [],
    "examples": [
      "note(\"d f a a# a d3\").fast(2).s(\"supersaw\").spread(\"<0 .3 1>\")"
    ],
    "params": [
      {
        "name": "spread",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "squiz",
    "description": "<p>Made by Calum Gunn. Reminiscent of some weird mixture of filter, ring-modulator and pitch-shifter. The SuperCollider manual defines Squiz as:</p>\n<p>&quot;A simplistic pitch-raising algorithm. It's not meant to sound natural; its sound is reminiscent of some weird mixture of filter, ring-modulator and pitch-shifter, depending on the input. The algorithm works by cutting the signal into fragments (delimited by upwards-going zero-crossings) and squeezing those fragments in the time domain (i.e. simply playing them back faster than they came in), leaving silences inbetween. All the parameters apart from memlen can be modulated.&quot;</p>",
    "synonyms": [],
    "examples": [
      "squiz(\"2 4/2 6 [8 16]\").s(\"bd\").osc()"
    ],
    "params": [
      {
        "name": "squiz",
        "type": "number | Pattern",
        "description": "<p>Try passing multiples of 2 to it - 2, 4, 8 etc.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "stepcat",
    "description": "<p>'Concatenates' patterns like <code>fastcat</code>, but proportional to a number of steps per cycle.\nThe steps can either be inferred from the pattern, or provided as a [length, pattern] pair.\nHas the alias <code>timecat</code>.</p>",
    "synonyms": [
      "timeCat",
      "timecat"
    ],
    "examples": [
      "stepcat([3,\"e3\"],[1, \"g3\"]).note()\n// the same as \"e3@3 g3\".note()",
      "stepcat(\"bd sd cp\",\"hh hh\").sound()\n// the same as \"bd sd cp hh hh\".sound()"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "stretch",
    "description": "<p>Changes the speed of sample playback, i.e. a cheap way of changing pitch.</p>",
    "synonyms": [],
    "examples": [
      "s(\"gm_flute\").stretch(\"1 2 .5\")"
    ],
    "params": [
      {
        "name": "factor",
        "type": "number | Pattern",
        "description": "<p>inf to inf, negative numbers play the sample backwards.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "stut",
    "description": "<p>Deprecated. Like echo, but the last 2 parameters are flipped.</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd sd\").stut(3, .8, 1/6)"
    ],
    "params": [
      {
        "name": "times",
        "type": "number",
        "description": "<p>how many times to repeat</p>"
      },
      {
        "name": "feedback",
        "type": "number",
        "description": "<p>velocity multiplicator for each iteration</p>"
      },
      {
        "name": "time",
        "type": "number",
        "description": "<p>cycle offset between iterations</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "sustain",
    "description": "<p>Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.</p>",
    "synonyms": [
      "sus"
    ],
    "examples": [
      "note(\"c3 e3 f3 g3\").decay(.2).sustain(\"<0 .1 .4 .6 1>\")"
    ],
    "params": [
      {
        "name": "gain",
        "type": "number | Pattern",
        "description": "<p>sustain level between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "sysex",
    "description": "<p>MIDI sysex: Sends a MIDI sysex message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").sysex([\"0x77\", \"0x01:0x02:0x03:0x04\"]).midichan(1).midi()"
    ],
    "params": [
      {
        "name": "id",
        "type": "number | Pattern",
        "description": "<p>Sysex ID</p>"
      },
      {
        "name": "data",
        "type": "number | Pattern",
        "description": "<p>Sysex data</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "sysexdata",
    "description": "<p>MIDI sysex data: Sends a MIDI sysex message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").sysexid(\"0x77\").sysexdata(\"0x01:0x02:0x03:0x04\").midichan(1).midi()"
    ],
    "params": [
      {
        "name": "data",
        "type": "number | Pattern",
        "description": "<p>Sysex data</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "sysexid",
    "description": "<p>MIDI sysex ID: Sends a MIDI sysex identifier message.</p>",
    "synonyms": [],
    "examples": [
      "note(\"c4\").sysexid(\"0x77\").sysexdata(\"0x01:0x02:0x03:0x04\").midichan(1).midi()"
    ],
    "params": [
      {
        "name": "id",
        "type": "number | Pattern",
        "description": "<p>Sysex ID</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tables",
    "description": "<p>Loads a collection of wavetables to use with <code>s</code></p>",
    "synonyms": [],
    "examples": [],
    "params": [],
    "file": "wavetable",
    "superdirtOnly": false
  },
  {
    "name": "tag",
    "description": "<p>Tags each Hap with an identifier. Good for filtering. The function populates Hap.context.tags (Array).</p>",
    "synonyms": [],
    "examples": [
      "s(\"saw!16\").note(\"F1\")\n  .lpf(tri.range(40, 80).slow(4)).lpenv(5).lpq(4).lpd(0.15)\n  .when(rand.late(0.1).gte(0.5), x => x.transpose(\"12\").tag('altered'))\n  .when(rand.late(0.2).gte(0.5), x => x.s(\"square\").tag('altered'))\n  .when(\"<0 1>\", x => x.filter((hap) => hap.hasTag('altered')))"
    ],
    "params": [
      {
        "name": "tag",
        "type": "string",
        "description": "<p>anything unique</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "transient",
    "description": "<p>Transient shaper. Gives independent control over the emphasis on transients\nand sustains</p>",
    "synonyms": [],
    "examples": [
      "s(\"bd\").transient(\"<-1 -0.5 0 0.5 1>\")",
      "s(\"hh*16\").bank(\"tr909\").transient(\"<-1:1 1:-1>\")"
    ],
    "params": [
      {
        "name": "attack",
        "type": "number | Pattern",
        "description": "<p>Emphasis on transients; between -1 (deaccentuate) and 1 (accentuate)</p>"
      },
      {
        "name": "sustain",
        "type": "number | Pattern",
        "description": "<p>Emphasis on the sustains; between -1 (deaccentuate) and 1 (accentuate)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremolo",
    "description": "<p>Modulate the amplitude of a sound with a continuous waveform</p>",
    "synonyms": [
      "trem"
    ],
    "examples": [
      "note(\"d d d# d\".fast(4)).s(\"supersaw\").tremolo(\"<3 2 100> \").tremoloskew(\"<.5>\")"
    ],
    "params": [
      {
        "name": "speed",
        "type": "number | Pattern",
        "description": "<p>modulation speed in HZ</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremolodepth",
    "description": "<p>Depth of amplitude modulation</p>",
    "synonyms": [
      "tremdepth"
    ],
    "examples": [
      "note(\"a1 a1 a#1 a1\".fast(4)).s(\"pulse\").tremsync(4).tremolodepth(\"<1 2 .7>\")"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremolophase",
    "description": "<p>Alter the phase of the modulation waveform</p>",
    "synonyms": [
      "tremphase"
    ],
    "examples": [
      "note(\"{f a c e}%16\").s(\"sawtooth\").tremsync(4).tremolophase(\"<0 .25 .66>\")"
    ],
    "params": [
      {
        "name": "offset",
        "type": "number | Pattern",
        "description": "<p>the offset in cycles of the modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremoloshape",
    "description": "<p>Shape of amplitude modulation</p>",
    "synonyms": [
      "tremshape"
    ],
    "examples": [
      "note(\"{f g c d}%16\").tremsync(4).tremoloshape(\"<sine tri square>\").s(\"sawtooth\")"
    ],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>tri | square | sine | saw | ramp</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremoloskew",
    "description": "<p>Alter the shape of the modulation waveform</p>",
    "synonyms": [
      "tremskew"
    ],
    "examples": [
      "note(\"{f a c e}%16\").s(\"sawtooth\").tremsync(4).tremoloskew(\"<.5 0 1>\")"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>between 0 &amp; 1, the shape of the waveform</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "tremolosync",
    "description": "<p>Modulate the amplitude of a sound with a continuous waveform</p>",
    "synonyms": [
      "tremsync"
    ],
    "examples": [
      "note(\"d d d# d\".fast(4)).s(\"supersaw\").tremolosync(\"4\").tremoloskew(\"<1 .5 0>\")"
    ],
    "params": [
      {
        "name": "cycles",
        "type": "number | Pattern",
        "description": "<p>modulation speed in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "unison",
    "description": "<p>Set number of stacked voices for supported oscillators</p>",
    "synonyms": [],
    "examples": [
      "note(\"d f a a# a d3\").fast(2).s(\"supersaw\").unison(\"<1 2 7>\")"
    ],
    "params": [
      {
        "name": "numvoices",
        "type": "number | Pattern",
        "description": ""
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "unit",
    "description": "<p>Used in conjunction with <code>speed</code>, accepts values of &quot;r&quot; (rate, default behavior), &quot;c&quot; (cycles), or &quot;s&quot; (seconds). Using <code>unit &quot;c&quot;</code> means <code>speed</code> will be interpreted in units of cycles, e.g. <code>speed &quot;1&quot;</code> means samples will be stretched to fill a cycle. Using <code>unit &quot;s&quot;</code> means the playback speed will be adjusted so that the duration is the number of seconds specified by <code>speed</code>.</p>",
    "synonyms": [],
    "examples": [
      "speed(\"1 2 .5 3\").s(\"bd\").unit(\"c\").osc()"
    ],
    "params": [
      {
        "name": "unit",
        "type": "number | string | Pattern",
        "description": "<p>see description above</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": true
  },
  {
    "name": "useRNG",
    "description": "<p>Sets which random number generator to use. Historically Strudel would\nuse <code>useRNG('legacy')</code>, which remains the default. To use a new more statistically\nprecise RNG, try <code>useRNG('precise')</code>.</p>",
    "synonyms": [],
    "examples": [
      "useRNG('legacy')\n// Repeats every 300 cycles\n$: n(irand(50)).seg(16).scale(\"C:minor\").ribbon(88, 32)\n$: n(irand(50)).seg(16).scale(\"C:minor\").ribbon(388, 32)"
    ],
    "params": [
      {
        "name": "mod",
        "type": "string",
        "description": "<p>Mode. One of 'legacy', 'precise'</p>"
      }
    ],
    "file": "signal",
    "superdirtOnly": false
  },
  {
    "name": "velocity",
    "description": "<p>Sets the velocity from 0 to 1. Is multiplied together with gain.</p>",
    "synonyms": [
      "vel"
    ],
    "examples": [
      "s(\"hh*8\")\n.gain(\".4!2 1 .4!2 1 .4 1\")\n.velocity(\".4 1\")"
    ],
    "params": [],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "vib",
    "description": "<p>Applies a vibrato to the frequency of the oscillator.</p>",
    "synonyms": [
      "vibrato",
      "v"
    ],
    "examples": [
      "note(\"a e\")\n.vib(\"<.5 1 2 4 8 16>\")\n._scope()",
      "// change the modulation depth with \":\"\nnote(\"a e\")\n.vib(\"<.5 1 2 4 8 16>:12\")\n._scope()"
    ],
    "params": [
      {
        "name": "frequency",
        "type": "number | Pattern",
        "description": "<p>of the vibrato in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "vibmod",
    "description": "<p>Sets the vibrato depth in semitones. Only has an effect if <code>vibrato</code> | <code>vib</code> | <code>v</code> is is also set</p>",
    "synonyms": [
      "vmod"
    ],
    "examples": [
      "note(\"a e\").vib(4)\n.vibmod(\"<.25 .5 1 2 12>\")\n._scope()",
      "// change the vibrato frequency with \":\"\nnote(\"a e\")\n.vibmod(\"<.25 .5 1 2 12>:8\")\n._scope()"
    ],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>of vibrato (in semitones)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "voicing",
    "description": "<p>Turns chord symbols into voicings. You can use the following control params:</p>\n<ul>\n<li><code>chord</code>: Note, followed by chord symbol, e.g. C Am G7 Bb^7</li>\n<li><code>dict</code>: voicing dictionary to use, falls back to default dictionary</li>\n<li><code>anchor</code>: the note that is used to align the chord</li>\n<li><code>mode</code>: how the voicing is aligned to the anchor\n<ul>\n<li><code>below</code>: top note &lt;= anchor</li>\n<li><code>duck</code>: top note &lt;= anchor, anchor excluded</li>\n<li><code>above</code>: bottom note &gt;= anchor</li>\n</ul>\n</li>\n<li><code>offset</code>: whole number that shifts the voicing up or down to the next voicing</li>\n<li><code>n</code>: if set, the voicing is played like a scale. Overshooting numbers will be octaved</li>\n</ul>\n<p>All of the above controls are optional, except <code>chord</code>.\nIf you pass a pattern of strings to voicing, they will be interpreted as chords.</p>",
    "synonyms": [],
    "examples": [
      "n(\"0 1 2 3\").chord(\"<C Am F G>\").voicing()"
    ],
    "params": [],
    "file": "voicings",
    "superdirtOnly": false
  },
  {
    "name": "vowel",
    "description": "<p>Formant filter to make things sound like vowels.</p>",
    "synonyms": [],
    "examples": [
      "note(\"[c2 <eb2 <g2 g1>>]*2\").s('sawtooth')\n.vowel(\"<a e i <o u>>\")",
      "s(\"bd sd mt ht bd [~ cp] ht lt\").vowel(\"[a|e|i|o|u]\")"
    ],
    "params": [
      {
        "name": "vowel",
        "type": "string | Pattern",
        "description": "<p>You can use a e i o u ae aa oe ue y uh un en an on, corresponding to [a] [e] [i] [o] [u] [æ] [ɑ] [ø] [y] [ɯ] [ʌ] [œ̃] [ɛ̃] [ɑ̃] [ɔ̃]. Aliases: aa = å = ɑ, oe = ø = ö, y = ı, ae = æ.</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warp",
    "description": "<p>Amount of warp (alteration of the waveform) to apply to the wavetable oscillator</p>",
    "synonyms": [
      "wavetableWarp"
    ],
    "examples": [
      "s(\"basique\").bank(\"wt_digital\").seg(8).note(\"F1\").warp(\"0 0.25 0.5 0.75 1\")\n  .warpmode(\"spin\")"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>Warp of the wavetable from 0 to 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpattack",
    "description": "<p>Attack time of the wavetable oscillator's warp envelope</p>",
    "synonyms": [
      "warpatt"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>attack time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpdc",
    "description": "<p>DC offset of the LFO for the wavetable oscillator's warp</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "dcoffset",
        "type": "number | Pattern",
        "description": "<p>dc offset. set to 0 for unipolar</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpdecay",
    "description": "<p>Decay time of the wavetable oscillator's warp envelope</p>",
    "synonyms": [
      "warpdec"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>decay time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpdepth",
    "description": "<p>Depth of the LFO for the wavetable oscillator's warp</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpenv",
    "description": "<p>Amount of envelope applied wavetable oscillator's position envelope</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpmode",
    "description": "<p>Type of warp (alteration of the waveform) to apply to the wavetable oscillator.</p>\n<p>The current options are: none, asym, bendp, bendm, bendmp, sync, quant, fold, pwm, orbit,\nspin, chaos, primes, binary, brownian, reciprocal, wormhole, logistic, sigmoid, fractal, flip</p>",
    "synonyms": [
      "wavetableWarpMode"
    ],
    "examples": [
      "s(\"morgana\").bank(\"wt_digital\").seg(8).note(\"F1\").warp(\"0 0.25 0.5 0.75 1\")\n  .warpmode(\"<asym bendp spin logistic sync wormhole brownian>*2\")"
    ],
    "params": [
      {
        "name": "mode",
        "type": "number | string | Pattern",
        "description": "<p>Warp mode</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warprate",
    "description": "<p>Rate of the LFO for the wavetable oscillator's warp</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warprelease",
    "description": "<p>Release time of the wavetable oscillator's warp envelope</p>",
    "synonyms": [
      "warprel"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>release time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpshape",
    "description": "<p>Shape of the LFO for the wavetable oscillator's warp</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>Shape of the lfo (0, 1, 2, ..)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpskew",
    "description": "<p>Skew of the LFO for the wavetable oscillator's warp</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "skew",
        "type": "number | Pattern",
        "description": "<p>How much to bend the LFO shape</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpsustain",
    "description": "<p>Sustain time of the wavetable oscillator's warp envelope</p>",
    "synonyms": [
      "warpsus"
    ],
    "examples": [],
    "params": [
      {
        "name": "gain",
        "type": "number | Pattern",
        "description": "<p>sustain level (0 to 1)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "warpsync",
    "description": "<p>cycle synced rate of the LFO for the wavetable warp position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "within",
    "description": "<p>Use within to apply a function to only a part of a pattern.</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "start",
        "type": "number",
        "description": "<p>start within cycle (0 - 1)</p>"
      },
      {
        "name": "end",
        "type": "number",
        "description": "<p>end within cycle (0 - 1). Must be &gt; start</p>"
      },
      {
        "name": "func",
        "type": "function",
        "description": "<p>function to be applied to the sub-pattern</p>"
      }
    ],
    "file": "pattern",
    "superdirtOnly": false
  },
  {
    "name": "wordfall",
    "description": "<p>Displays a vertical pianoroll with event labels.\nSupports all the same options as pianoroll.</p>",
    "synonyms": [],
    "examples": [],
    "params": [],
    "file": "pianoroll",
    "superdirtOnly": false
  },
  {
    "name": "wt",
    "description": "<p>Position in the wavetable of the wavetable oscillator</p>",
    "synonyms": [
      "wavetablePosition"
    ],
    "examples": [
      "s(\"squelch\").bank(\"wt_digital\").seg(8).note(\"F1\").wt(\"0 0.25 0.5 0.75 1\")"
    ],
    "params": [
      {
        "name": "position",
        "type": "number | Pattern",
        "description": "<p>Position in the wavetable from 0 to 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtattack",
    "description": "<p>Attack time of the wavetable oscillator's position envelope</p>",
    "synonyms": [
      "wtatt"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>attack time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtdc",
    "description": "<p>DC offset of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "dcoffset",
        "type": "number | Pattern",
        "description": "<p>dc offset. set to 0 for unipolar</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtdecay",
    "description": "<p>Decay time of the wavetable oscillator's position envelope</p>",
    "synonyms": [
      "wtdec"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>decay time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtdepth",
    "description": "<p>Depth of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "depth",
        "type": "number | Pattern",
        "description": "<p>depth of modulation</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtenv",
    "description": "<p>Amount of envelope applied wavetable oscillator's position envelope</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>between 0 and 1</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtphaserand",
    "description": "<p>Amount of randomness of the initial phase of the wavetable oscillator.</p>",
    "synonyms": [
      "wavetablePhaseRand"
    ],
    "examples": [
      "s(\"basique\").bank(\"wt_digital\").seg(16).wtphaserand(\"<0 1>\")"
    ],
    "params": [
      {
        "name": "amount",
        "type": "number | Pattern",
        "description": "<p>Randomness of the initial phase. Between 0 (not random) and 1 (fully random)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtrate",
    "description": "<p>Rate of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in hertz</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtrelease",
    "description": "<p>Release time of the wavetable oscillator's position envelope</p>",
    "synonyms": [
      "wtrel"
    ],
    "examples": [],
    "params": [
      {
        "name": "time",
        "type": "number | Pattern",
        "description": "<p>release time in seconds</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtshape",
    "description": "<p>Shape of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "shape",
        "type": "number | Pattern",
        "description": "<p>Shape of the lfo (0, 1, 2, ..)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtskew",
    "description": "<p>Skew of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "skew",
        "type": "number | Pattern",
        "description": "<p>How much to bend the LFO shape</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtsustain",
    "description": "<p>Sustain time of the wavetable oscillator's position envelope</p>",
    "synonyms": [
      "wtsus"
    ],
    "examples": [],
    "params": [
      {
        "name": "gain",
        "type": "number | Pattern",
        "description": "<p>sustain level (0 to 1)</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "wtsync",
    "description": "<p>cycle synced rate of the LFO for the wavetable oscillator's position</p>",
    "synonyms": [],
    "examples": [],
    "params": [
      {
        "name": "rate",
        "type": "number | Pattern",
        "description": "<p>rate in cycles</p>"
      }
    ],
    "file": "controls",
    "superdirtOnly": false
  },
  {
    "name": "xfade",
    "description": "<p>Cross-fades between left and right from 0 to 1:</p>\n<ul>\n<li>0 = (full left, no right)</li>\n<li>.5 = (both equal)</li>\n<li>1 = (no left, full right)</li>\n</ul>",
    "synonyms": [],
    "examples": [
      "xfade(s(\"bd*2\"), \"<0 .25 .5 .75 1>\", s(\"hh*8\"))"
    ],
    "params": [],
    "file": "pattern",
    "superdirtOnly": false
  }
];

export const DOC_FILES = ["codemirror", "controls", "midi", "motion", "pattern", "pianoroll", "pick", "pitchwheel", "repl", "scope", "signal", "slider", "spectrum", "spiral", "superdough", "tonal", "voicings", "wavetable"] as const;
