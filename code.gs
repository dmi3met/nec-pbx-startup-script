function searchFirstIndex_2D (arr,value) {
  // return index of row with first item = value 
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] == value)
      return i
  }
}

function addSetToRows (arr) {
  // return a string contains formatted lines like 'SET	10-01	(0,0,8)	"344"\r\n\'
  var result = '';
  for each (var row in arr) {
    result+=['SET	',row[0],'	',row[1],'	"',row[2],'"\r\n'].join()
  }
  return result
}

function saveScript() {
  // get settings table from sheet 'form'
  const rawForm = SpreadsheetApp.getActiveSpreadsheet()
                                .getSheetByName('form')
                                .getSheetValues(1, 1, 3, 5);
  
  const [,,atsModel,rusify,restrictFilename] = rawForm[0]; // atsModel = 'SL2100'; 
  const [,,netIp,netMask,netGateway] = rawForm[1]; //var netIp = '192.168.0.10';
  const [,,extStart,extCount,extEnd] = rawForm[2];
  // get format rules table from sheet 'rules'
  const rawRules = SpreadsheetApp.getActiveSpreadsheet()
                                 .getSheetByName('rules')
                                 .getSheetValues(1, 1, 10, 7)  ;
 
  const modelIndex = searchFirstIndex_2D(rawRules,atsModel);
 
  // get current PBX format rules
  const [,ipRule,ipRuleItem,
        maskRule,maskRuleItem,
        gatewayRule,gatewayRuleItem] = rawRules[modelIndex]

  const workingFolder = DriveApp.getFoldersByName('nec').next();
  // get russian language file content in ./nec/atsModel
  var rusContent = '';
  if (rusify == '+') {
    rusContent = workingFolder.getFoldersByName(atsModel).next()
                              .getFiles().next().getBlob().getDataAsString();
  }
  // get call restriction file content in ./nec/
  const restrictContent = workingFolder.getFilesByName(restrictFilename).next()
                                       .getBlob().getDataAsString();

  const settingsRaw = [
     [ipRule,ipRuleItem,netIp],
     [maskRule,maskRuleItem,netMask],
     [gatewayRule,gatewayRuleItem,netGateway]
  ];
 
 const settingsContent = addSetToRows(settingsRaw);
 
 const content = rusContent+restrictContent+settingsContent;
 const filename = atsModel+'-'+netIp+'.pcs';
 const SAVEFILE = true;
  if (SAVEFILE) {  // for debug only
 const file = DriveApp.createFile(filename, content, 'text/html');
 const downloadUrl = file.getDownloadUrl();

  } else {
 Logger.log(content);
 }
 
}
