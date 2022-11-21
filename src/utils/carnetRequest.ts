import fetch from 'node-fetch';

// eslint-disable-next-line import/prefer-default-export
export async function carnetNameRequest(studentCode: string) {
  const websecgenRes = await fetch('http://websecgen.unmsm.edu.pe/carne/carne.aspx', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,es;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: 'AMCV_4D6368F454EC41940A4C98A6%40AdobeOrg=-2121179033%7CMCIDTS%7C19243%7CMCMID%7C58505380327749689480958356562107143857%7CMCAAMLH-1663130574%7C4%7CMCAAMB-1663130574%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1662532974s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-19250%7CvVersion%7C5.3.0; s_pers=%20v8%3D1662525836184%7C1757133836184%3B%20v8_s%3DFirst%2520Visit%7C1662527636184%3B%20c19%3Dpr%253Apure%2520portal%253Apersons%253Aview%7C1662527636192%3B%20v68%3D1662525835235%7C1662527636221%3B; __utma=165303783.506084233.1662658626.1662959785.1662959785.1; __utmz=165303783.1662959785.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); amp_adc4c4=QdLyo8-lTWUepkJP1Mhspq...1gdgcirqu.1gdgcj8ie.0.0.0; amp_d915a9=c8XdfPgsTQ5w40mSx7hk-Z.MVRoVFVINGtuUmFVV00wSmJCbm9XZVJUb2lGMg==..1gdgcis3s.1gdgcj8od.0.12.12; ASP.NET_SessionId=pmnqtyru0l4pq0il34ikslby; __utma=85720863.506084233.1662658626.1664578414.1664578414.1; __utmc=85720863; __utmz=85720863.1664578414.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); tk_or=%22https%3A%2F%2Fwww.google.com%2F%22; tk_lr=%22https%3A%2F%2Fwww.google.com%2F%22; _ga_D366LERZQD=GS1.1.1668177583.1.1.1668181001.0.0.0; _ga=GA1.1.506084233.1662658626; _ga_LEJ0F8DTRG=GS1.1.1668271478.4.1.1668272444.0.0.0; _ga_8GFJVSE3W0=GS1.1.1668414439.20.0.1668415684.0.0.0',
      Referer: 'http://websecgen.unmsm.edu.pe/carne/carne.aspx',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0',
    },
    body: `ctl00%24ScriptManager1=ctl00%24ContentPlaceHolder1%24UpdatePanel1%7Cctl00%24ContentPlaceHolder1%24cmdConsultar&__EVENTTARGET=&__EVENTARGUMENT=&ctl00%24ContentPlaceHolder1%24txtUsuario=${studentCode}&ctl00%24ContentPlaceHolder1%24txtFacultad=FACULTAD%20DE%20INGENIER%C3%8DA%20DE%20SISTEMAS%20E%20INFORM%C3%81TICA&ctl00%24ContentPlaceHolder1%24txtPrograma=Ingenier%C3%ADa%20de%20Software&ctl00%24ContentPlaceHolder1%24txtAlumno=RODRIGO%20JOSE%20ALVA%20S%C3%81ENZ&ctl00%24ContentPlaceHolder1%24NoBot1%24NoBot1_NoBotExtender_ClientState=CHALLENGE&ctl00%24ContentPlaceHolder1%24TextBoxWatermarkExtender1_ClientState=&ctl00%24ContentPlaceHolder1%24MaskedEditExtender1_ClientState=&__VIEWSTATE=%2FwEPDwULLTEzNzI1Nzc1MTAPZBYCZg9kFgICBA9kFgICBA9kFgICAQ9kFgJmD2QWFAIDDw8WAh4JTWF4TGVuZ3RoZmRkAgkPDxYCHgRUZXh0ZWRkAhIPDxYCHwEFMkZBQ1VMVEFEIERFIElOR0VOSUVSw41BIERFIFNJU1RFTUFTIEUgSU5GT1JNw4FUSUNBZGQCFg8PFgIfAQUXSW5nZW5pZXLDrWEgZGUgU29mdHdhcmVkZAIaDw8WAh8BBRhST0RSSUdPIEpPU0UgQUxWQSBTw4FFTlpkZAIcDw8WAh8BZWRkAh4PPCsADQEADxYEHgtfIURhdGFCb3VuZGceC18hSXRlbUNvdW50AgFkFgJmD2QWBAIBD2QWBmYPDxYCHwEFATFkZAIBDw8WAh8BBRFDYXJuJiMyMzM7IFBlZGlkb2RkAgIPDxYCHwEFCjI2LTA2LTIwMjJkZAICDw8WAh4HVmlzaWJsZWhkZAIgDw8WBB4ISW1hZ2VVcmwFNGltYWdlbmVzLVVOTVNNLzIwLzIvMDAxMDAyMjIwMDIzMi5qcGc%2FMjAyMjA0MjEwOTA3NTgeDUFsdGVybmF0ZVRleHQFE0PDs2RpZ286IDAwMjIyMDAyMzJkZAIiDw8WBB42Tm9Cb3RfUmVzcG9uc2VUaW1lS2V5X2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTm9Cb3QxBmMR5uCBx9pIHjROb0JvdF9TZXNzaW9uS2V5S2V5X2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTm9Cb3QxBUROb0JvdF9TZXNzaW9uS2V5X2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTm9Cb3QxXzYzODA0MTY1Nzg0NDIyOTIxOWQWAgIBDxYCHg9DaGFsbGVuZ2VTY3JpcHQFGSdjSGFMbEVuR2UnLnRvVXBwZXJDYXNlKClkAiYPFhoeFkN1bHR1cmVUaW1lUGxhY2Vob2xkZXIFAToeDklucHV0RGlyZWN0aW9uCymKAUFqYXhDb250cm9sVG9vbGtpdC5NYXNrZWRFZGl0SW5wdXREaXJlY3Rpb24sIEFqYXhDb250cm9sVG9vbGtpdCwgVmVyc2lvbj0xLjAuMjAyMjkuMjA4MjEsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49MjhmMDFiMGU4NGI2ZDUzZQAeG0N1bHR1cmVUaG91c2FuZHNQbGFjZWhvbGRlcgUBLB4RQ3VsdHVyZURhdGVGb3JtYXQFA0RNWR4WQ3VsdHVyZURhdGVQbGFjZWhvbGRlcgUBLx4MRGlzcGxheU1vbmV5CymGAUFqYXhDb250cm9sVG9vbGtpdC5NYXNrZWRFZGl0U2hvd1N5bWJvbCwgQWpheENvbnRyb2xUb29sa2l0LCBWZXJzaW9uPTEuMC4yMDIyOS4yMDgyMSwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0yOGYwMWIwZTg0YjZkNTNlAB4OQWNjZXB0TmVnYXRpdmULKwUAHgpBY2NlcHRBbVBtaB4TT3ZlcnJpZGVQYWdlQ3VsdHVyZWgeGUN1bHR1cmVEZWNpbWFsUGxhY2Vob2xkZXIFAS4eFkN1bHR1cmVBTVBNUGxhY2Vob2xkZXIFCWEubS47cC5tLh4gQ3VsdHVyZUN1cnJlbmN5U3ltYm9sUGxhY2Vob2xkZXIFA1MvLh4LQ3VsdHVyZU5hbWUFBWVzLVBFZBgBBSdjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJGd2RXN0YWRvQ2FybmUPPCsACgEIAgFkmCKoU7qTIb%2FGkDjK8QBwC0TkDfk%3D&__VIEWSTATEGENERATOR=ABB7F4A4&__EVENTVALIDATION=%2FwEWCQLkuJrXDgKnqqeUBAKikZQ3AvmukKoFAu2%2BtNsDAu7ClKsEArOCz7YHAsmmlswJAtHui4oEQBJjTMXt6HxY6rawAtqEbCIrLv0%3D&__ASYNCPOST=true&ctl00%24ContentPlaceHolder1%24cmdConsultar=Consultar`,
    method: 'POST',
  });
  const carnetHTML = await websecgenRes.text();
  const nameLine = carnetHTML
    .split('\n')
    .find((line) => line.includes('ctl00_ContentPlaceHolder1_txtAlumno'));

  const facultyLine = carnetHTML
    .split('\n')
    .find((line) => line.includes('ctl00_ContentPlaceHolder1_txtFacultad'));

  if (!nameLine || !facultyLine) {
    throw new Error('Could not find student name');
  }
  const fullname = nameLine.split('value="')[1].split('"')[0].trim();
  const faculty = facultyLine.split('value="')[1].split('"')[0].trim();

  if (!fullname || !faculty) {
    return null;
  }
  return { fullname, faculty };
}
