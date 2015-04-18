Dim fso, f
  Set fso = CreateObject("Scripting.FileSystemObject")
  Set f1 = fso.GetFolder("connect")
  Set f2 = fso.GetFolder("init")
  Set f3 = fso.GetFolder("node_modules")
  Set f4 = fso.GetFolder("route")
  Set f5 = fso.GetFolder("stuInfo")
  Set f6 = fso.GetFile("MyFileServer$1.class")
  Set f7 = fso.GetFile("MyFileServer.class")
  Set f8 = fso.GetFile("package.json")
  Set f9 = fso.GetFile("testInfo.js")
  Set f10 = fso.GetFile("useFrame$1.class")
  Set f11 = fso.GetFile("useFrame$2.class")
  Set f12 = fso.GetFile("useFrame$3.class")
  Set f13 = fso.GetFile("useFrame.class")
  Set f14 = fso.GetFile("app.js")
  
  If f10.attributes <> 2 Then
    setAttr(2)
    MsgBox("隐藏文件")
  Else
    setAttr(0)
    MsgBox("显示文件")
  End If

Function setAttr(par)
  f1.attributes = par
  f2.attributes = par
  f3.attributes = par
  f4.attributes = par
  f5.attributes = par
  f6.attributes = par
  f7.attributes = par
  f8.attributes = par
  f9.attributes = par
  f10.attributes = par
  f11.attributes = par
  f12.attributes = par
  f13.attributes = par
  f14.attributes = par
End Function
