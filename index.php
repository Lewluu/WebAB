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
        <script src="src/scripts/script.js"></script>
        <script>
        </script>
    <body>
        <script>
            HelloWorld();
        </script>
        <div id="interface">
            <div id="tool_panel_1">
                <div class="tool-section">
                    <div class="tool-section-menu">
                        <p>LAYOUTS</p>
                        <img src="src/icons/arrow.png">
                    </div>
                    <p>Add Layout:</p>
                    <!-- <div class="layout-draggable" draggable="true">
                    </div> -->
                    <p>Add Layout Element:</p>
                </div>
                <div class="tool-section">
                    <p>STYLING</p>
                    <p>No element/elements selected</p>
                    <p>Color:</p>
                    <p>Font style: </p>
                    <p>Rotation: </p>
                    <p>Animation: </p>
                    <p>Type of position: </p>
                </div>
                <div class="tool-section">
                    <p>TEMPLATES</p>
                    <p>Element templates:</p>
                    <p>Whole templates:</p>
                </div>
                <div class="tool-section">
                    <p>MENU</p>
                    <p>Refresh</p>
                    <p>Upload</p>
                    <p>Export</p>
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
    </body>
</html>