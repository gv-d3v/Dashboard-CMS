@echo off
setlocal enabledelayedexpansion

REM Delete existing _pre_deploy folder if it exists
if exist _pre_deploy rmdir /s /q _pre_deploy

REM Create _pre_deploy folder
mkdir _pre_deploy

REM List of files and folders to exclude
set "excludeList=.git .next node_modules .gitattributes .pre_deploy.bat __START.bat _live.url _local.url _NPM.bat .Deploy-CMS.lnk"

REM Loop through all files and folders
for /f "tokens=*" %%i in ('dir /b /a') do (
    set "excludeItem="
    
    REM Check if the item is in the exclusion list
    for %%x in (%excludeList%) do (
        if /i "%%i"=="%%x" set "excludeItem=1"
    )

    REM Copy the item to _pre_deploy folder if not excluded
    if not defined excludeItem (
        echo Copying: %%i
        if exist "%%i\" (
            xcopy /I /E /Y "%%i" "_pre_deploy\%%i\"
        ) else (
            copy "%%i" "_pre_deploy\"
        )
    )
)

echo Copy process completed.
