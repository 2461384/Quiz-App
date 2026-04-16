# Maven Wrapper PowerShell Script
param(
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$MavenArgs
)

# Set JAVA_HOME if not already set
if (-not $env:JAVA_HOME) {
    $env:JAVA_HOME = "C:\Program Files\Java\jdk-25"
}

# Verify Java is available
if (-not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    Write-Error "Java not found at $env:JAVA_HOME"
    exit 1
}

# Maven wrapper JAR location
$wrapperJar = "$PSScriptRoot\.mvn\wrapper\maven-wrapper.jar"
$wrapperProps = "$PSScriptRoot\.mvn\wrapper\maven-wrapper.properties"
$projectBaseDir = $PSScriptRoot

# Default Maven version
$mavenVersion = "3.8.6"

$mavenUrl = "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$mavenVersion/apache-maven-$mavenVersion-bin.zip"
$mavenHome = "$env:TEMP\maven-$mavenVersion"
$mavenZip = "$env:TEMP\maven-$mavenVersion.zip"

# Download Maven if not present
if (-not (Test-Path "$mavenHome\bin\mvn")) {
    Write-Host "Downloading Maven $mavenVersion..."
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
        $client = New-Object System.Net.WebClient
        $client.DownloadFile($mavenUrl, $mavenZip)
        Write-Host "Extracting Maven..."
        if (Test-Path $mavenZip) {
            Expand-Archive -Path $mavenZip -DestinationPath "$env:TEMP" -Force
            Remove-Item $mavenZip -ErrorAction SilentlyContinue
        }
    } catch {
        Write-Host "Failed to download Maven: $_"
        exit 1
    }
}

# Add Maven to PATH
$env:Path = "$mavenHome\bin;$env:Path"

# Run Maven using cmd /c to execute through batch
$args = "-Dmaven.multiModuleProjectDirectory=$projectBaseDir"," " + ($MavenArgs -join " ")
cmd /c "$mavenHome\bin\mvn.cmd" $args
exit $LASTEXITCODE
