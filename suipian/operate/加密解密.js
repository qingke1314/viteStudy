//解密
function UnEncrypt(Text) {
  var output = [];
  var alterText = [];
  var varCost = [];
  var TextSize = Text.length;
  for (i = 0; i < TextSize; i++) {
    alterText[i] = Text.charCodeAt(i);
    varCost[i] = Text.charCodeAt(i + 1);
  }
  for (i = 0; i < TextSize; i = i + 2) {
    output += String.fromCharCode(alterText[i] - varCost[i]);
  }
  return output;
}
const str = UnEncrypt('Ù\x8C\x9DTò«Þx±dÁ\x80\x96fÈ\x81°m£P×f´m°]î¥ô\x92\x84Qð¬Éxè£\x9CZã¢Þ\x8Dü§ò±ëª\x88T¨aå\x97Ç\x86«gÔ\x91æ¤¿V×\x86\x9DRË\x89ë\x84Èw«hô¡½\x8Bê\x96§M¡]ÄQêµ¼\x91ÃT÷\x85ï£ö\x9D²o½qË\x96é\x96ĝª·mïºØ¤Ø­´RÄt¨eċµÕb×¦á\x87¨Wô£ĕ\x9Eï\x9Fß­¶dõ\x86¡Që\x80þ¸ĉ¸Â|Õ£Ìbě¸ÍyÙ©©aĝ¯Õ\x87à\x92»g\x8BSĆ¬ÝnÄsØqþ´ą±ÂP¿xğ¨Ý\x8Fĝ´ã®Ý\x8C¶h§SÀ~Ò\x8EĈ\x99\x9ARÌ\x89\x97cë|é\x9Fĉ¤Ī·\x8FN§Q³Zí\x88»\x85©eĜ­ø\x80²ZªW\x90WÊ|Ĕ¨ė¤Ó\x9BÕ~Õs\x95N­há©í\x93\x9FQĕ®¯`\x97T°{ī·¹c÷\x81ì»¹bÚ\x84¸NÖ]å£ĉ\x92µ~ð\x85\x86TÝe¾\x87£qÞ\x9BÕ¦çvÞtÆvĂ\x93Ď\x95ð\x81¸\x89Íb\x9FPó¼£Où ãwò¼Ø\x87í\x7Fàk\x9AfĔªú\x89Ài\x9Cmð§ď¢Ò\x86Õfõ\x80Č\x9C\x8E_ÿ\x91ù\x86Ë\x81ÚjÄTï\x9AĪ°Úl¼v\x8F_ø\x9Fą\x9Eê\x88Ĭ³¼g¯\x80³Oü¶Ó\x8Dù«ï­Ú\x89Æ}×\x93«jþ­¡`´r')
console.log(str, '解密')