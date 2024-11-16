<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capturar datos del formulario
    $nombre = $_POST['nombre'];
    $dni = $_POST['dni'];
    $email = $_POST['email'];

    // Datos a enviar a MockAPI
    $data = [
        'nombre' => $nombre,
        'dni' => $dni,
        'email' => $email
    ];

    // URL de tu MockAPI
    $apiUrl = 'https://6737db304eb22e24fca64f87.mockapi.io/subscripciones/subscripcion';

    // Inicializar cURL
    $ch = curl_init($apiUrl);

    // Configurar cURL para enviar datos mediante POST
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Ejecutar la solicitud
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Validar la respuesta
    if ($httpCode === 201) { // 201 significa "Creado"
        echo "<script>alert('¡Gracias por suscribirte! Tus datos han sido guardados.'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Hubo un problema al guardar tus datos.'); window.location.href='index.html';</script>";
    }
}
?>
