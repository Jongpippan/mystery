$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$yeowulGame = Split-Path -Parent $PSScriptRoot
$yeowulAudio = Join-Path $yeowulGame 'public/audio'
New-Item -ItemType Directory -Force -Path $yeowulAudio | Out-Null
$yeowulCorpus = Get-Content -Raw -Encoding UTF8 (Join-Path $yeowulGame 'content/screenplay.generated.json') | ConvertFrom-Json
$yeowulVoice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$yeowulVoice.SelectVoice('Microsoft Heami Desktop')
$yeowulFormat = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(22050, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
$yeowulPhrases = @(
    @{ Name = 'setup-count.wav'; Text = $yeowulCorpus.utterances.S_CH02_02_0006.text; Rate = 0 },
    @{ Name = 'phrase-1.wav'; Text = '잠시 뒤, 정산 자료를'; Rate = -1 },
    @{ Name = 'phrase-2.wav'; Text = '아, 이 의'; Rate = -1 },
    @{ Name = 'phrase-3.wav'; Text = '자부터 좀'; Rate = -1 },
    @{ Name = 'phrase-4.wav'; Text = '다시 하겠습니다.'; Rate = -1 },
    @{ Name = 'consented-voice.wav'; Text = $yeowulCorpus.utterances.S_EP_04_0302.text; Rate = 0 }
)
try {
    foreach ($yeowulPhrase in $yeowulPhrases) {
        $yeowulVoice.Rate = $yeowulPhrase.Rate
        $yeowulVoice.SetOutputToWaveFile((Join-Path $yeowulAudio $yeowulPhrase.Name), $yeowulFormat)
        $yeowulVoice.Speak($yeowulPhrase.Text)
        $yeowulVoice.SetOutputToNull()
    }
} finally { $yeowulVoice.Dispose() }
Write-Output 'Rendered Korean rehearsal phrases and the sole consented school-file sentence.'
