<?php
  $path = parse_url(strip_tags($_SERVER['REQUEST_URI']), PHP_URL_PATH);
  $parts = explode('/', $path);
  array_shift($parts);

  if ($parts[2] === 'D7ZmpLKWs49ngi-DMbaO6RjZwjqnm8kxH3cNXyENwyk') {
    LetsEncrypt('D7ZmpLKWs49ngi-DMbaO6RjZwjqnm8kxH3cNXyENwyk.ntmZcx-PzCdxVAqDF2vdBDAbh0v-aQE20uFB2ua_5vk');
  } else {
    LetsEncrypt('something did not work right');
  }

  function LetsEncrypt($response) {
    header('Content-Type: text/plain');
    echo $response;
  }
?>
