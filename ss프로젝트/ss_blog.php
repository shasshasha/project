<?php
    session_start();
?>
<meta charset="UTF-8">
<?php

    if(!$title)
    {
        echo ("<script>alert('제목을 입력하세요')</script>");
        echo ("<script>location.href='ss_blogwrite.php'</script>");
    }
    else if(!$write)
    {
        echo ("<script>alert('글내용을 입력하세요')</script>");
        echo ("<script>location.href='ss_blogwrite.php'</script>");
    }
    else{
        $date = date("m월d일h시i분");
        
        $upfile_name=$_FILES["upfile"]["name"];
        $upfile_tmp_name=$_FILES["upfile"]["tmp_name"];
        $upfile_type=$_FILES["upfile"]["type"];
        $upfile_size=$_FILES["upfile"]["size"];
        $upfile_error=$_FILES["upfile"]["error"];
        
        $files=$_FILES["upfile"];
        $count=count($files["name"]);
        
        $upload_dir='./data/';
        for($i=0; $i<$count; $i++)
        {
            $upfile_name[$i]=$files["name"][$i];
            $upfile_tmp_name[$i]=$files["tmp_name"][$i];
            $upfile_type[$i]=$files["type"][$i];
            $upfile_size[$i]=$files["size"][$i];
            $upfile_error[$i]=$files["error"][$i];
            
            $file=explode(".",$upfile_name[$i]);
            $file_name=$file[0];
            $file_ext=$file[1];
            
            if(!$upfile_error[$i])
            {
                $new_file_name=date("Y_m_d_h_i_s");
                $new_file_name=$new_file_name."_".$i;
                $copied_file_name[$i]=$new_file_name.".".$file_ext;
                $uploaded_file[$i]=$upload_dir.$copied_file_name[$i];
                
            if(($upfile_type[$i]!="image/gif") && ($upfile_type[$i]!="image/jpeg") && ($upfile_type[$i]!="image/pgif"))
            {
                echo "<script>alert('jpg 나 gif이미지 파일만 업로드가능')</script>";
                echo "<script>location.href='index.php'</script>";
                $blog=1;
                $writeform=1;
                $_SESSION['writeform']=$writeform;
                $_SESSION['blog']=$blog;
                exit;
            }
            if(!move_uploaded_file($upfile_tmp_name[$i],$uploaded_file[$i]))
            {
                echo "<script>alert('파일복하 실패')</script>";
                echo "<script>location.href='index.php'</script>";
                $blog=1;
                $writeform=1;
                $_SESSION['writeform']=$writeform;
                $_SESSION['blog']=$blog;
                exit;
            }
            }
        }
        include"member_database.php";
        
        
        $sql="insert into ss_2(id,name,title,body,date,file_name_0,file_name_1,file_name_2,file_copied_0,file_copied_1,file_copied_2)";
        $sql.="values ('$userid','$username','$title','$write','$date','$upfile_name[0]','$upfile_name[1]','$upfile_name[2]','$copied_file_name[0]','$copied_file_name[1]','$copied_file_name[2]')";
        mysql_query($sql,$connect);
        
        $blog=1;
        $writeform=0;
        $_SESSION['writeform']=$writeform;
        $_SESSION['blog']=$blog;
        
        echo "<script>location.href='index.php'</script>";
    }
?>