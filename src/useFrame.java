import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeListener;

import javax.swing.Action;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.JOptionPane;
import java.awt.event.*;
import java.awt.*;

public class useFrame {
   private JFrame jf = new JFrame();
   private static JTextField tf1 = new JTextField("40");
   private static JTextField tf2 = new JTextField("1");
   private static JTextField tf3 = new JTextField("2");
   private static JTextField tf4 = new JTextField("2");
   private static JTextField tf5 = new JTextField("2");
   private static JTextField tf6 = new JTextField("10");
   private static String str[] = new String[6];
   private static Process p2 = null;
   private static Process p3 = null;
   //main
   ////////////////////////////////////////////////
   public static void main(String[]args){
	   
	   useFrame uf = new useFrame();
	   uf.setMyFrame();
	   JFrame myjf = uf.getMyFrame();
	   JPanel jpw = uf.getPanel(400, 460, 6, 1);
	   JPanel jpe = uf.getPanel(200, 460, 6, 1);
	   JButton jbt1 = new JButton("store setting");
	   JButton jbt2 = new JButton("start system");
	   JPanel jbt = uf.getPanel(600,60,1,2);
	   jbt.add(jbt1);
	   jbt.add(jbt2);
	   jbt1.addActionListener(new ActionListener() {
		
		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			DealWithExam();
		}
	});
	   jbt2.addActionListener(new ActionListener() {
		
		@Override
		public void actionPerformed(ActionEvent e) {
			// TODO Auto-generated method stub
			DealWithExam2();
		}
	});

	   JLabel jlb = new JLabel("exam information setting");
	   myjf.add(jpw,BorderLayout.WEST);
	   myjf.add(jpe,BorderLayout.CENTER);
	   myjf.add(jbt,BorderLayout.SOUTH);
	   myjf.add(jlb,BorderLayout.NORTH);
	   uf.addContent(jpw,jpe);//add label and text
	   
   }
   
   ///
   private static void DealWithExam(){
	   try{
			String cmdStr[] = {"cmd", "/k", "node","testInfo",tf1.getText(),tf2.getText(),tf3.getText(),tf4.getText(),tf5.getText(),tf6.getText()};
			Process p1 = Runtime.getRuntime().exec(cmdStr);
			//prc.waitFor();
			JOptionPane.showMessageDialog(null,"setting success!");
		}catch(Exception ex){
		//ex.printStackTrace();
			System.out.println("do not exist testInfo");
		}
   }
   private static void DealWithExam2(){
	   try{
			String cmdStr2 = "cmd /k java MyFileServer";
			p2 = Runtime.getRuntime().exec(cmdStr2);
			String cmdStr3[] = {"cmd", "/k", "node","app"};
			p3 = Runtime.getRuntime().exec(cmdStr3);
			JOptionPane.showMessageDialog(null,"exam is starting,please keep the window open!");
		}catch(Exception ex){
		//ex.printStackTrace();
			System.out.println("do not exist testInfo");
		}
   }
   
   /////
   private void addContent(JPanel jpw,JPanel jpe){
	   jpw.add(new JLabel("set students' num"));
	   jpw.add(new JLabel("set grade"));
	   jpw.add(new JLabel("singleSelect's score:"));
	   jpw.add(new JLabel("MultiSelect's score:"));
	   jpw.add(new JLabel("Judgement's score:"));
	   jpw.add(new JLabel("Program design's score:"));
	   jpe.add(tf1);
	   jpe.add(tf2);
	   jpe.add(tf3);
	   jpe.add(tf4);
	   jpe.add(tf5);
	   jpe.add(tf6);
   }
   
   public void setMyFrame(){
	   jf.setSize(600,500);
	   jf.setBackground(new Color(10,200,10));
	   jf.setVisible(true);
	   jf.setLayout(new BorderLayout());
	   jf.addWindowListener(new WindowAdapter(){
			public void windowClosing(WindowEvent e){
				try{
					p2.destroy();
					p3.destroy();
				}catch(Exception ex){

				}
				System.exit(0);
			}
		});
	   
   }
   public JPanel getPanel(int width,int height,int rows,int cols){
	   JPanel pan = new JPanel();
	   pan.setSize(width,height);
	   pan.setBackground(new Color(80,150,80));
	   pan.setLayout(new GridLayout(rows, cols));
	   return pan;
   }
   public void addCompo(JPanel jp,Component com[]){
	   
   }
   public JFrame getMyFrame(){
	   return jf;
   }
}
