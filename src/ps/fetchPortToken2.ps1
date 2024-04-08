$processInfo = Get-WmiObject Win32_Process -Filter "name = 'LeagueClientUx.exe'"
$commandLine = $processInfo.CommandLine

# コマンドライン引数をスペースで分割
$arguments = $commandLine -split ' '

$appPort = $null
$authToken = $null

foreach ($arg in $arguments) {
    if ($arg -match "--app-port=(\d+)") {
        $appPort = $matches[1]
        Write-Output "App Port: $appPort"
    }
    elseif ($arg -match "--remoting-auth-token=([a-zA-Z0-9]+)") {
        $authToken = $matches[1]
        $authInfo = "riot:$authToken"
        $encodedAuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($authInfo))
        Write-Output "Auth Token: $authToken"
        Write-Output "Encoded Auth Info: $encodedAuthInfo"
    }
}

if ($null -eq $appPort) {
    Write-Output "App Port was not found."
}

if ($null -eq $authToken) {
    Write-Output "Auth Token was not found."
}
