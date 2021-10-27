<?php
if($_POST["submit"]) {
    $recipient="mudzanani27@gmail.com";
    $subject= $_POST["subject"];
    $sender=$_POST["name"];
    $senderEmail=$_POST["email"];
    $senderCell=$_POST["cell"];
    $message=$_POST["message"];
    $mailBody="Name: $sender \nCell number: $senderCell\nEmail Address: $senderEmail\n\nMessage: $message";
    mail($recipient, $subject, $mailBody);
    sleep(1);
    header("Location:http://tshimangadzo.github.io/index.html?#contactMe");
}
?>