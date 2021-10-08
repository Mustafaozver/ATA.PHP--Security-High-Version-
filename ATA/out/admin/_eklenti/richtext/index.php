<?php
function escapePhpString($target) {
    $replacements = array(
            "'" => '\\\'',
            "\\" => '\\\\',
            "\r\n" => "\\r\\n",
            "\n" => "\\n"
    );
    return strtr($target, $replacements);
}
 $sekmeler .= "";
 $icerik .= "
<div id=\"divsection_".($sekme_s++)."\" class=\"col-lg-16\">
 <div class=\"card mb-5 mb-lg-0\">         
  <div class=\"card-header\">
   <h2 class=\"h6 mb-0 text-uppercase\">Blog Post</h2>
  </div>
  <div class=\"card-body\">
   <form method=\"post\" action=\"\">
    <input type=\"hidden\" name=\"action\" value=\"postsend\" />
    <input type=\"hidden\" name=\"image\" value=\"\" />". // view,date, likes,id
"   Title : <input type=\"text\" name=\"title\" />
    <script src=\"js/richtext.js\" type=\"text/javascript\" language=\"javascript\"></script>
    <script src=\"js/config.js\" type=\"text/javascript\" language=\"javascript\"></script>"; // freeRTE_content
 if (isset($_POST["action"])){ if(strtolower($_POST["action"]) == "postsend") {
  $string = escapePhpString("".@$_POST["freeRTE_content"]);
  mysql_query("INSERT INTO blog(image_url,title,content) Values(\"".@$_POST["image"]."\",\"".@$_POST["title"]."\",\"".$string."\")");
  $icerik .= "    <script>initRTE(\"icerik:".$string."\",'css/blogpost.css');</script>";
 };} else $icerik .= "    <script>initRTE(\"\",'css/blogpost.css');</script>";
$icerik .= " 
   <input type=\"submit\" value=\"Post\" />
   </form>
  </div>
 </div>
</div>";

 $sekme_s++;

?>