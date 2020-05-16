$user = $args[0]
$ip = $args[1]
$app = $args[2]

# echo ${user}@192.168.${ip}:/var/www/html/${app}/

scp index.html scripts.js ${user}@192.168.${ip}:/var/www/html/${app}/