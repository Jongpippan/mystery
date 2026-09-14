param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$gameRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$gameUrl = 'http://127.0.0.1:4173/'
$gameReady = $false
try { $response = Invoke-WebRequest -UseBasicParsing -Uri $gameUrl -TimeoutSec 3; $gameReady = $response.StatusCode -eq 200 -and $response.Content.Contains('여울관') } catch {}
if (-not $gameReady) {
  if (-not (Test-Path -LiteralPath (Join-Path $gameRoot 'dist/server/wrangler.json'))) { throw '실행 파일을 먼저 빌드해 주세요: npm.cmd run build' }
  $nodePath = (Get-Command node -ErrorAction Stop).Source
  $logRoot = Join-Path $gameRoot '.vinext'
  New-Item -ItemType Directory -Path $logRoot -Force | Out-Null
  $process = Start-Process -FilePath $nodePath -ArgumentList @('--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--local','--persist-to','.wrangler/state','--ip','127.0.0.1','--port','4173','--inspector-port','0') -WorkingDirectory $gameRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logRoot 'game-start.log') -RedirectStandardError (Join-Path $logRoot 'game-error.log') -PassThru
  for ($attempt = 0; $attempt -lt 60; $attempt++) {
    Start-Sleep -Milliseconds 500
    try { $response = Invoke-WebRequest -UseBasicParsing -Uri $gameUrl -TimeoutSec 2; if ($response.StatusCode -eq 200 -and $response.Content.Contains('여울관')) { $gameReady = $true; break } } catch {}
    if ($process.HasExited) { break }
  }
  if (-not $gameReady) { throw "게임을 열지 못했습니다. 실행 기록을 확인해 주세요: $logRoot" }
}
if (-not $NoBrowser) { Start-Process $gameUrl }
Write-Output $gameUrl
