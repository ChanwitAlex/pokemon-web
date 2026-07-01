"use client";

import { Container, Typography, Card, CardContent, Button, Avatar, Box, Divider, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

export default function AboutPage() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f12", py: 8 }}>
      <Container maxWidth="sm">
        
        {/* ปุ่มกดย้อนกลับไปหน้าแรก */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push("/")} 
          sx={{ mb: 4, fontWeight: "bold", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}
        >
          Back to Pokédex
        </Button>

        {/* บัตรข้อมูลโปรเจกต์ */}
        <Card sx={{ borderRadius: 5, bgcolor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0px 10px 30px rgba(0,0,0,0.3)", p: { xs: 2, sm: 4 } }}>
          
          {/* หัวข้อ Developer Information */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <PersonIcon sx={{ color: "#1a202c" }} />
            <Typography variant="h6" component="h2" sx={{ fontWeight: "700", color: "#1a202c" }}>
              Developer Information
            </Typography>
          </Box>

          {/* รูปโปรไฟล์และ Social Media */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}>
            <Box sx={{ 
              bgcolor: "#f7fafc", 
              borderRadius: "50%", 
              p: 0.5, 
              border: "2px solid #edf2f7",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              display: "inline-block"
            }}>
              <Avatar 
                alt="ชาญวิทย์ อุ่นสกุล"
                src="Alex.jpg" // 👈 สามารถใส่พาธรูปภาพของคุณตรงนี้ได้ เช่น "/profile.jpg"
                sx={{ width: 120, height: 120, bgcolor: "#ff4d4d", fontSize: "2.5rem" }}
              >
              </Avatar>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1a202c", mt: 2, mb: 0.5 }}>
              ชาญวิทย์ อุ่นสกุล
            </Typography>
            <Typography variant="body2" sx={{ color: "#718096", fontWeight: "500", mb: 2 }}>
              Front-end Web Developer
            </Typography>

            {/* ปุ่ม Social Media (เอา GitHub ออก และเพิ่มลิงก์เปิดแท็บใหม่เด้งไปที่แอป) */}
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              
              {/* ปุ่ม Facebook */}
              <Avatar 
                component="a"
                href="https://www.facebook.com/chanwit.unsakul.3?locale=th_TH" // 👈 เปลี่ยนเป็นลิงก์เฟซบุ๊กจริงของคุณตรงนี้
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  bgcolor: "#1877f2", 
                  width: 36, 
                  height: 36, 
                  cursor: "pointer", 
                  textDecoration: "none",
                  "&:hover": { opacity: 0.8 } 
                }}
              >
                <FacebookIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Avatar>

              {/* ปุ่ม Instagram */}
              <Avatar 
                component="a"
                href="https://www.instagram.com/chanwit_alex/" // 👈 เปลี่ยนเป็นลิงก์ไอจีจริงของคุณตรงนี้
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  bgcolor: "#e1306c", 
                  width: 36, 
                  height: 36, 
                  cursor: "pointer", 
                  textDecoration: "none",
                  "&:hover": { opacity: 0.8 } 
                }}
              >
                <InstagramIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Avatar>

            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ข้อมูลการจัดวางแบบ Stack (แก้ไขพรอพ width ย้ายเข้า sx เพื่อเคลียร์ Error TypeScript แล้ว) */}
          <Box sx={{ color: "#2d3748", my: 3 }}>
            <Stack spacing={2} sx={{ width: "100%" }}>
              
              <Typography variant="body1">
                <strong>ชื่อ-นามสกุล : </strong> ชาญวิทย์ อุ่นสกุล
              </Typography>

              <Typography variant="body1">
                <strong>รหัสนักศึกษา : </strong> 673450187-3
              </Typography>

              <Typography variant="body1">
                <strong>สาขาวิชา : </strong> Computer and Information Science
              </Typography>

              <Typography variant="body1">
                <strong>รายวิชา : </strong> Front-end Web Programming
              </Typography>

              <Typography variant="body1">
                <strong>คณะ : </strong> คณะสหวิทยาการ
              </Typography>

              <Typography variant="body1">
                <SchoolIcon sx={{ verticalAlign: "middle", mr: 1, color: "#ff4d4d" }} />
                มหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย
              </Typography>

            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ส่วนท้ายรายละเอียดเกี่ยวกับโปรเจกต์ */}
          <CardContent sx={{ p: 0 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "900", color: "#1a202c", mb: 1 }}>
              About This Project
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: "italic", lineHeight: 1.6 }}>
              "โปรเจกต์นี้พัฒนาขึ้นมาเพื่อเรียนรู้และประยุกต์ใช้ความรู้ด้านการทำ Pagination, Dynamic Routing, Data Fetching จาก PokeAPI และการจัดหน้าเว็บให้เป็นระบบ Responsive ด้วย Material-UI"
            </Typography>

            {/* ปุ่มลิงก์ไปหน้า GitHub Source Code ใหญ่ด้านล่าง */}
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              href="https://github.com" // 👈 เปลี่ยนเป็นลิงก์ Repository งานของคุณได้ครับ
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              sx={{ 
                bgcolor: "#1a202c", 
                color: "#fff",
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                "&:hover": { bgcolor: "#2d3748" } 
              }}
            >
              GitHub Source Code
            </Button>
          </CardContent>

        </Card>
      </Container>
    </Box>
  );
}