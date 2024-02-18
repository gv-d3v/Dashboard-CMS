@echo off
setlocal enabledelayedexpansion

REM Create _pre_deploy folder if it doesn't exist
if not exist _pre_deploy mkdir _pre_deploy

REM Loop through all files and folders
for /f "tokens=*" %%i in ('dir /b /a') do (
    set "excludeFolder="
    
    REM Check if the item is a folder to exclude
    for %%x in (.git .next node_modules) do (
        if /i "%%i"=="%%x" set "excludeFolder=1"
    )

    REM Check if the item is a file to exclude
    for %%x in (.gitattributes) do (
        if /i "%%i"=="%%x" set "excludeFolder=1"
    )

    REM Copy the item to _pre_deploy folder if not excluded
    if not defined excludeFolder (
        echo Copying: %%i
        if exist "%%i\" (
            xcopy /I /E /Y "%%i" "_pre_deploy\%%i\"
        ) else (
            copy "%%i" "_pre_deploy\"
        )
    )
)

echo Copy process completed.
