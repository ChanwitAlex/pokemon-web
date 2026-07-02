"use client";

import { Container, Typography, Card, CardContent, Button, Box, Divider, Stack, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail"; 
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from '@mui/icons-material/Badge';
import ClassIcon from '@mui/icons-material/Class';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Avatar } from "@mui/material";

export default function AboutPage() {
  const router = useRouter();

  // สไตล์สำหรับ Typography หัวข้อหลัก (Title)
  const mainTitleStyle = {
    fontWeight: "800",
    color: "#1a202c",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  };

  // สไตล์สำหรับข้อมูลแต่ละบรรทัดใน Stack
  const infoRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 1.5,
    borderRadius: 2,
    bgcolor: "#f8fafc",
    border: "1px solid #e2e8f0",
  };

  // สไตล์สำหรับ Icon ใน Info Row
  const infoIconStyle = {
    color: "#ff4d4d",
    fontSize: "1.25rem",
  };

  // สไตล์สำหรับปุ่ม Social Media และ Gmail
  const socialButtonStyle = {
    width: 40,
    height: 40,
    cursor: "pointer",
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f12", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="sm">
        
        {/* ปุ่มกดย้อนกลับ */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push("/")} 
          sx={{ 
            mb: 4, 
            fontWeight: "bold", 
            color: "#fff", 
            textTransform: "none",
            borderRadius: 3,
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } 
          }}
        >
          Back to Pokédex
        </Button>

        {/* บัตรข้อมูลโปรเจกต์ */}
        <Card sx={{ 
          borderRadius: 6, 
          bgcolor: "#ffffff", 
          border: "1px solid #e2e8f0", 
          boxShadow: "0px 20px 40px rgba(0,0,0,0.4)", 
        }}>
          
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            
            {/* หัวข้อ Developer Information */}
            <Typography variant="h5" sx={mainTitleStyle}>
              <PersonIcon sx={{ color: "#ff4d4d", fontSize: "1.75rem" }} />
              Developer Information
            </Typography>

            <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

            {/* ส่วนข้อมูลประวัตินักศึกษา (Personal Info) */}
            <Stack spacing={2} sx={{ width: "100%", color: "#2d3748" }}>
              
              {/* ชื่อ-นามสกุล อยู่บนสุดเหนือนรหัสนักศึกษา */}
              <Box sx={infoRowStyle}>
                <PersonIcon sx={infoIconStyle} />
                <Typography variant="body1">
                  <strong>ชื่อ-นามสกุล:</strong> นายชาญวิทย์ อุ่นสกุล
                </Typography>
              </Box>

              <Box sx={infoRowStyle}>
                <BadgeIcon sx={infoIconStyle} />
                <Typography variant="body1">
                  <strong>รหัสนักศึกษา:</strong> 673450187-3
                </Typography>
              </Box>

              <Box sx={infoRowStyle}>
                <AccountTreeIcon sx={infoIconStyle} />
                <Typography variant="body1">
                  <strong>สาขาวิชา:</strong> Computer and Information Science
                </Typography>
              </Box>

              <Box sx={infoRowStyle}>
                <ClassIcon sx={infoIconStyle} />
                <Typography variant="body1">
                  <strong>รายวิชา:</strong> Front-end Web Programming
                </Typography>
              </Box>

              <Box sx={infoRowStyle}>
                <SchoolIcon sx={infoIconStyle} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>คณะสหวิทยาการ</Typography>
                  <Typography variant="body2" sx={{ color: "#718096" }}>มหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย</Typography>
                </Box>
              </Box>

            </Stack>

            {/* เส้นคั่นพร้อมปุ่มช่องทางติดต่อด้านล่างประวัตินักศึกษา */}
            <Divider sx={{ my: 4, borderColor: "#e2e8f0" }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", px: 1 }}>
                Contact Developer
              </Typography>
            </Divider>

            {/* ปุ่มสำหรับคลิกติดต่อทาง Gmail และ Social Media อื่นๆ */}
            <Stack direction="row" spacing={2.5} sx={{ justifyContent: "center", mb: 2 }}>
              {/* ปุ่ม Gmail (กดแล้วจะเปิดเว็บ Gmail ที่แท็บใหม่ทันที) */}
              <Avatar 
                component="a"
                href="https://mail.google.com" 
                target="_blank"                
                rel="noopener noreferrer"
                sx={{ ...socialButtonStyle, bgcolor: "#ea4335" }} 
              >
                <MailIcon sx={{ fontSize: 22, color: "#fff" }} />
              </Avatar>

              <Avatar 
                component="a"
                href="https://www.facebook.com/chanwit.unsakul.3?locale=th_TH" 
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...socialButtonStyle, bgcolor: "#1877f2" }}
              >
                <FacebookIcon sx={{ fontSize: 22, color: "#fff" }} />
              </Avatar>

              <Avatar 
                component="a"
                href="https://www.instagram.com/chanwit_alex/" 
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...socialButtonStyle, bgcolor: "#e1306c" }}
              >
                <InstagramIcon sx={{ fontSize: 22, color: "#fff" }} />
              </Avatar>
            </Stack>

            <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />

            {/* ส่วนท้ายรายละเอียดเกี่ยวกับโปรเจกต์ */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" sx={{ ...mainTitleStyle, mb: 1.5 }}>
                <GitHubIcon sx={{ color: "#ff4d4d", fontSize: "1.75rem" }} />
                About This Project
              </Typography>
              
              <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #e2e8f0", mb: 3.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", lineHeight: 1.7, textAlign: "justify" }}>
                  "โปรเจกต์นี้พัฒนาขึ้นมาเพื่อเรียนรู้และประยุกต์ใช้ความรู้ด้านการทำ Pagination, Dynamic Routing, Data Fetching จาก PokeAPI และการจัดหน้าเว็บให้เป็นระบบ Responsive ด้วย Material-UI โดยเน้นการสร้าง User Experience ที่ดีในการค้นหาข้อมูลโปเกมอน"
                </Typography>
              </Paper>

              {/* ปุ่มลิงก์ไปหน้า GitHub */}
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href="https://github.com/ChanwitAlex/pokemon-web"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{ 
                  bgcolor: "#1a202c", 
                  color: "#fff",
                  py: 1.8,
                  borderRadius: 4,
                  fontWeight: "800",
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0px 8px 20px rgba(26,32,44,0.3)",
                  transition: "all 0.2s",
                  "&:hover": { 
                    bgcolor: "#2d3748",
                    boxShadow: "0px 12px 28px rgba(26,32,44,0.4)",
                    transform: "translateY(-2px)"
                  } 
                }}
              >
                View on GitHub Source Code
              </Button>
            </Box>

          </CardContent>

        </Card>
      </Container>
    </Box>
  );
}