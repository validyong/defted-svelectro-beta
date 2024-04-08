$processInfo = Get-WmiObject Win32_Process -Filter "name = 'LeagueClientUx.exe'"
$commandLine = $processInfo.CommandLine

echo $commandLine

$appPortRegex = "--app-port=(\d+)"
$authTokenRegex = "--remoting-auth-token=([a-zA-Z0-9]+)"

if ($commandLine -match $appPortRegex) {
    $appPort = $matches[1]
    Write-Output "App Port: $appPort"
}

if ($commandLine -match $authTokenRegex) {
    $authToken = $matches[1]
    $authInfo = "riot:$authToken"
    $encodedAuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($authInfo))
    Write-Output "Auth Token: $authToken"
    Write-Output "Encoded Auth Info: $encodedAuthInfo"
}
