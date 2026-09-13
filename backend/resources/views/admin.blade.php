<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="noindex,nofollow">
    <title>Aishwary CMS</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="ael-admin-body">
    <div id="admin-app"><div class="ael-boot"><span></span><p>Loading Aishwary CMS...</p></div></div>
    <div id="admin-toast" class="ael-toast" role="status" aria-live="polite"></div>
</body>
</html>
