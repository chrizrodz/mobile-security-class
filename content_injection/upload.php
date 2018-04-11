<?php
move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "test.txt");
exec("python3 py_script.py");
echo "Your file has been uploaded and processed"
?>
