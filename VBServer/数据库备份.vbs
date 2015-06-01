databasename ="demo.mdb"
tablename ="demo"

Call CopyMdb()
Call UpdateColumn(databasename,tablename)


Sub UpdateColumn(databasename1, tablename1)
	Dim connObj
	Set connObj = CreateObject("ADODB.Connection")
	connObj.Open "Provider=Microsoft.Jet.OLEDB.4.0;" & "Data Source = " & databasename1
	connObj.Execute "UPDATE " & tablename1 & " SET paperID = 0"
	connObj.Execute "UPDATE " & tablename1 & " SET score = 0"
	connObj.Close
	Set connObj = Nothing
End Sub

Sub CopyMdb()
	Dim fso
	Set fso = CreateObject("Scripting.FileSystemObject")
	Dim MyDate
	MyDate = Date
	Dim MyTime
	MyTime = Time
	Dim m,n
	m = Split(MyDate,"/",-1,1)
	n = Split(MyTime,":",-1,1)
	Dim str1,str2,str
	str1 = Join(m,".")
	str2 = Join(n,"")
	str = str1 & "." & str2
	fso.CopyFile "demo.mdb","historyRecord\" & str & ".mdb"

End Sub