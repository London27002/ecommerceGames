<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Notification</title>
</head>
<body>
    <h1>Nuevo Producto Creado</h1>
    <p>Un nuevo producto ha sido creado:</p>
    <ul>
        <li><strong>ID:</strong> {{ $product->id_product }}</li>
        <li><strong>Título:</strong> {{ $product->title }}</li>
        <li><strong>Precio:</strong> ${{ $product->price }}</li>
        <li><strong>Inventario:</strong> {{ $product->stock }}</li>
        <li><strong>Categoría:</strong> {{ $product->category->name ?? 'Sin categoría' }}</li>
    </ul>
    <p>Gracias por usar nuestro sistema.</p>
</body>
</html>
