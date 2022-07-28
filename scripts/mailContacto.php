<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

$nombre = $_POST['name'];
$email = $_POST['email'];
$telefono = $_POST['phone'];
$mensaje = $_POST['message'];

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = '';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '';                     //SMTP username
    $mail->Password   = '';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('', 'Contacto Web');
    $mail->addAddress('ventas@bairesbright.net', 'Ventas');     //Add a recipient

    //MENSAJE
    $message = "<h4>Nombre: </h4>" . $nombre . " \r\n";
    $message .= "<h4>Email: </h4>" . $email . " \r\n";
    $message .= "<h4>Teléfono: </h4>" . $telefono . " \r\n";
    $message .= "<h4>Mensaje</h4>" . $mensaje;

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $nombre . ' solicita contacto';
    $mail->Body    = $message;
    $mail->AltBody = $message;

    $mail->send();
    echo json_encode('exito');
} catch (Exception $e) {
    echo json_encode('error');
}

?>