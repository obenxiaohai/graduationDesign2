import java.io.BufferedInputStream;
import java.io.IOException;  
import java.io.DataInputStream;  
import java.io.PrintWriter;  
import java.net.ServerSocket;  
import java.net.Socket;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;

public class MyFileServer {  
    public static void main(String[] args) throws IOException {  
        ServerSocket server = new ServerSocket(4002);  
          
        while (true) {  
            Socket socket = server.accept();  
            invoke(socket);  
        }  
    } 

     private static void invoke(final Socket client) throws IOException {  
        new Thread(new Runnable() {  
            public void run() {
            	String filePath = "./proDesign/";
                DataInputStream dis = null;  
                DataOutputStream ps = null;  
                try {  
                    dis = new DataInputStream(new BufferedInputStream(client.getInputStream()));
                    //dis.readByte();
 					filePath += dis.readInt();
 					filePath += ".rar";
 					System.out.println("filePath:"+filePath);
 					File fi = new File(filePath);
					System.out.println("file length:"+fi.length());  
 					DataInputStream fis = new DataInputStream(new BufferedInputStream(new FileInputStream(filePath)));
				    ps = new DataOutputStream(client.getOutputStream());
					ps.writeUTF(fi.getName());
					ps.flush();
					ps.writeLong((long)fi.length());
					ps.flush();

					int bufferSize = 8192;
					byte[]buf = new byte[bufferSize];

                   while(true){
					int read = 0;
					if(fis != null){
						read = fis.read(buf);
					}
					if(read == -1){
						break;
					}
					ps.write(buf,0,read);
				   }
				   ps.flush();
                } catch(IOException ex) {  
                    ex.printStackTrace();  
                } finally {  
                    try {  
                        dis.close();  
                    } catch (Exception e) {}  
                    try {  
                        ps.close();  
                    } catch (Exception e) {}  
                    try {  
                        client.close();  
                    } catch (Exception e) {}  
                }  
            }  
        }).start();  
    }  
} 