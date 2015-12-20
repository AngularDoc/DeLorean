<?php

  $path = parse_url(strip_tags($_SERVER['REQUEST_URI']), PHP_URL_PATH);
  $parts = explode('/', $path);
  array_shift($parts);

  if ($parts[2] === 'quwSVln4m8QB_LWBf8qoXyLQrFADMOKldM3iyIflYKw') {
    LetsEncrypt('quwSVln4m8QB_LWBf8qoXyLQrFADMOKldM3iyIflYKw.ZDbVZNc39xKxDYzl_7h4ZCuLZTfjt5-wyTijnyu6Zr4');
  } else if ($parts[2] === 'uGW-WPzeaff985SXJ51imNhTdqSov-mMDIY9GCddbfo') {
    LetsEncrypt('uGW-WPzeaff985SXJ51imNhTdqSov-mMDIY9GCddbfo.ZDbVZNc39xKxDYzl_7h4ZCuLZTfjt5-wyTijnyu6Zr4');
  } else {
    LetsEncrypt('something did not work right');
  }

  function LetsEncrypt($response) {
    header('Content-Type: text/plain');
    echo $response;
  }
?>