<!DOCTYPE html>
<html lang="en">
    <head>
        <title>WebAB</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <style>
            <?php include 'src/css/style.css' ?>
        </style>
        <?php echo '<script src="src/scripts/script.js?v=1"></script>' ?>
    </head>
    <body>
        <script>
            HelloWorld();
        </script>
        <div id="interface">
            <div id="tool_panel_1">
                <div class="tool-section">
                    <div class="tool-section-menu">
                        <p>LAYOUTS</p>
                        <div class="tool-section-menu-img">
                            <img onclick="arrowOnClick(0)" src="src/icons/arrow.png" class="arrow-rotate">
                        </div>
                    </div>
                    <div class="tool-section-display">
                        <p>Add Layout:</p>
                        <!-- <div class="layout-draggable" draggable="true">
                        </div> -->
                    <p>Add Layout Element:</p>
                    </div>
                </div>
                <div class="tool-section">
                    <div class="tool-section-menu">
                        <p>STYILING</p>
                        <div class="tool-section-menu-img">
                            <img onclick="arrowOnClick(1)" src="src/icons/arrow.png" class="arrow-rotate">
                        </div>
                    </div>
                    <div class="tool-section-display">
                        <p>No element/elements selected</p>
                        <p>Color:</p>
                        <p>Font style: </p>
                        <p>Rotation: </p>
                        <p>Animation: </p>
                        <p>Type of position: </p>
                    </div>
                </div>
                <div class="tool-section">
                    <div class="tool-section-menu">
                        <p>TEMPLATES</p>
                        <div class="tool-section-menu-img">
                            <img onclick="arrowOnClick(2)" src="src/icons/arrow.png" class="arrow-rotate">
                        </div>
                    </div>
                    <div class="tool-section-display">
                        <p>Element templates:</p>
                        <p>Whole templates:</p>
                    </div>
                </div>
                <div class="tool-section">
                    <div class="tool-section-menu">
                        <p>MENU</p>
                        <div class="tool-section-menu-img">
                            <img onclick="arrowOnClick(3)" src="src/icons/arrow.png" class="arrow-rotate">
                        </div>
                    </div>
                    <div class="tool-section-display">
                        <div onclick="optionOnClick(1)" class="menu-project-option"><p>Refresh</p></div>
                        <div onclick="optionOnClick(2)" class="menu-project-option"><p>New</p></div>
                        <div onclick="optionOnClick(3)" class="menu-project-option"><p>Upload</p></div>
                        <div onclick="optionOnClick(4)" class="menu-project-option"><p>Export</p></div>
                        <div onclick="optionOnClick(5)" class="menu-project-option"><p>Delete</p></div>
                    </div>
                </div>
            </div>
            <div id="combined_panel">
                <div id="main_panel">
                </div>
                <div id="tool_panel_2">
                    <div class="tool-section">
                        <p>Section 1 - Scripting</p>
                    </div>
                    <div class="tool-section">
                        <p>Section 2 - Back-End</p>
                    </div>
                    <div class="tool-section">
                        <p>Section 3 - Debug</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-new-project">
            <img onclick="closePopUp(0)" src="src/icons/close.png">
            <p>CREATE NEW PROJECT</p>
            <form action="src/include/create_project.php" method="POST">
                <p>Project name:</p>
                <input type="text" name="project_name">
                <p>Project owner:</p>
                <input type="text" name="project_owner">
                <p></p>
                <input type="submit" name="submit_project" value="Sumbit">
            </form>
        </div>
    </body>
</html>