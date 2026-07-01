"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Box,
  Skeleton,
  Pagination,
  TextField,
  MenuItem,
  InputAdornment,
  Chip,
  Grid
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";

interface PokemonResult {
  name: string;
  url: string;
}

interface DisplayPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  tier: string;
}

const POKEMON_TYPES = [
  { value: "all", label: "ธาตุทั้งหมด" },
  { value: "grass", label: "Grass (พืช)" },
  { value: "poison", label: "Poison (พิษ)" },
  { value: "fire", label: "Fire (ไฟ)" },
  { value: "water", label: "Water (น้ำ)" },
  { value: "flying", label: "Flying (บิน)" },
  { value: "bug", label: "Bug (แมลง)" },
  { value: "normal", label: "Normal (ปกติ)" },
  { value: "electric", label: "Electric (ไฟฟ้า)" },
  { value: "ground", label: "Ground (ดิน)" },
  { value: "fairy", label: "Fairy (แฟรี่)" },
  { value: "fighting", label: "Fighting (ต่อสู้)" },
  { value: "psychic", label: "Psychic (พลังจิต)" },
  { value: "rock", label: "Rock (หิน)" },
  { value: "steel", label: "Steel (เหล็ก)" },
  { value: "ice", label: "Ice (น้ำแข็ง)" },
  { value: "ghost", label: "Ghost (ผี)" },
  { value: "dragon", label: "Dragon (มังกร)" },
  { value: "dark", label: "Dark (มืด)" }
];

const POKEMON_TIERS = [
  { value: "all", label: "ระดับทั้งหมด" },
  { value: "Tier S", label: "Tier S (แข็งแกร่งมาก)" },
  { value: "Tier A", label: "Tier A" },
  { value: "Tier B", label: "Tier B" },
  { value: "Tier C", label: "Tier C" }
];

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: "#ff4d4d", water: "#3399ff", grass: "#4dff4d", electric: "#ffff33",
    poison: "#b300b3", bug: "#99cc33", flying: "#80b3ff", normal: "#a6a6a6",
    fairy: "#ffb3ff", ground: "#e6b800", fighting: "#cc3300", psychic: "#ff3399",
    rock: "#b3991a", steel: "#b3b3cc", ice: "#99ffff", ghost: "#6600cc",
    dragon: "#4d0099", dark: "#332211"
  };
  return colors[type.toLowerCase()] || "#777777";
};

export default function Home() {
  const [masterList, setMasterList] = useState<PokemonResult[]>([]);
  const [filteredList, setFilteredList] = useState<PokemonResult[]>([]);
  const [displayedPokemon, setDisplayedPokemon] = useState<DisplayPokemon[]>([]);
  
  const [page, setPage] = useState<number>(1);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  const limit = 20;

  useEffect(() => {
    setLoadingList(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0")
      .then((res) => res.json())
      .then((data) => {
        setMasterList(data.results);
        setFilteredList(data.results);
        setLoadingList(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoadingList(false);
      });
  }, []);

  useEffect(() => {
    let result = masterList;
    if (searchTerm.trim() !== "") {
      result = result.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredList(result);
    setPage(1);
  }, [searchTerm, masterList]);

  useEffect(() => {
    if (filteredList.length === 0) {
      setDisplayedPokemon([]);
      return;
    }

    const fetchCurrentPageDetails = async () => {
      setLoadingDetails(true);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const currentPageItems = filteredList.slice(startIndex, endIndex);

      try {
        const detailPromises = currentPageItems.map(async (item) => {
          const res = await fetch(item.url);
          const detail = await res.json();
          
          const totalStat = detail.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);
          let tier = "Tier C";
          if (totalStat >= 500) tier = "Tier S";
          else if (totalStat >= 420) tier = "Tier A";
          else if (totalStat >= 320) tier = "Tier B";

          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default || detail.sprites.front_default || "",
            types: detail.types.map((t: any) => t.type.name),
            tier: tier
          };
        });

        let pageResults: DisplayPokemon[] = await Promise.all(detailPromises);

        if (selectedType !== "all") {
          pageResults = pageResults.filter((p) => p.types.includes(selectedType.toLowerCase()));
        }
        if (selectedTier !== "all") {
          pageResults = pageResults.filter((p) => p.tier === selectedTier);
        }

        setDisplayedPokemon(pageResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchCurrentPageDetails();
  }, [page, filteredList, selectedType, selectedTier]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(filteredList.length / limit);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f12", color: "#fff", py: 6 }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", sm: "center" }, 
          gap: 2,
          mb: 5 
        }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "900", background: "linear-gradient(45deg, #ff4d4d, #f9d423)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Pokémon Pokedex
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 0.5 }}>
              ค้นหาและคัดกรองข้อมูลโปเกมอนมากกว่า 1,351 สายพันธุ์
            </Typography>
          </Box>
          <Link href="/about" passHref style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle1" sx={{ color: "#ff4d4d", fontWeight: "600", '&:hover': { color: "#ff7676", textDecoration: 'underline' } }}>
              About This Project ➔
            </Typography>
          </Link>
        </Box>

        {/* 🤍 Search & Filters - ปรับกรอบเป็นสีขาวสว่าง */}
        <Card 
          sx={{ 
            p: 3, 
            mb: 5, 
            borderRadius: 4, 
            bgcolor: "#ffffff", 
            border: "1px solid #e2e8f0",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
            display: "flex",
            flexDirection: "column",
            gap: 2.5
          }}
        >
          <TextField
            fullWidth
            placeholder="ค้นหาชื่อโปเกมอน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#718096" }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 3, 
                backgroundColor: "#f7fafc",
                color: "#1a202c",
                '& fieldset': { borderColor: "#cbd5e1" },
                '&:hover fieldset': { borderColor: "#ff4d4d" },
                '&.Mui-focused fieldset': { borderColor: "#ff4d4d" }
              } 
            }}
          />

          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <TextField
              select
              fullWidth
              label="ธาตุ (Type)"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 3, color: "#1a202c", bgcolor: "#f7fafc",
                  '& fieldset': { borderColor: "#cbd5e1" },
                  '&:hover fieldset': { borderColor: "#ff4d4d" },
                  '&.Mui-focused fieldset': { borderColor: "#ff4d4d" }
                },
                '& .MuiInputLabel-root': { color: "#4a5568" },
                '& .MuiInputLabel-root.Mui-focused': { color: "#ff4d4d" }
              }}
            >
              {POKEMON_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="ระดับ (Tier)"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 3, color: "#1a202c", bgcolor: "#f7fafc",
                  '& fieldset': { borderColor: "#cbd5e1" },
                  '&:hover fieldset': { borderColor: "#ff4d4d" },
                  '&.Mui-focused fieldset': { borderColor: "#ff4d4d" }
                },
                '& .MuiInputLabel-root': { color: "#4a5568" },
                '& .MuiInputLabel-root.Mui-focused': { color: "#ff4d4d" }
              }}
            >
              {POKEMON_TIERS.map((tier) => (
                <MenuItem key={tier.value} value={tier.value}>{tier.label}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Card>

        {/* 🤍 Grid ของโปเกมอน - ปรับกรอบการ์ดทั้งหมดให้เป็นสีขาวสว่าง */}
        <Grid container spacing={3}>
          {loadingList || loadingDetails
            ? Array.from(new Array(limit)).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card sx={{ borderRadius: 4, bgcolor: "#ffffff", border: "1px solid #e2e8f0" }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                      <Skeleton variant="circular" width={90} height={90} sx={{ bgcolor: "#edf2f7" }} />
                      <Skeleton variant="text" width="60%" height={30} sx={{ mt: 3, bgcolor: "#edf2f7" }} />
                      <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: "#edf2f7" }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : displayedPokemon.map((pokemon) => (
                <Grid key={pokemon.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Card sx={{ 
                    borderRadius: 4, 
                    bgcolor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                      transform: "translateY(-8px)", 
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                      borderColor: "#ff4d4d"
                    }
                  }}>
                    <Link href={`/pokemon/${pokemon.name}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Box sx={{ py: 3, cursor: 'pointer' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Box sx={{ 
                            bgcolor: "#f7fafc", 
                            borderRadius: "50%", 
                            p: 2, 
                            mb: 2,
                            border: "1px solid #edf2f7"
                          }}>
                            <Avatar
                              alt={pokemon.name}
                              sx={{ width: 100, height: 100, bgcolor: "transparent" }}
                              src={pokemon.image}
                            />
                          </Box>
                          
                          <Typography variant="h6" component="h2" sx={{ textTransform: "capitalize", fontWeight: "700", color: "#1a202c", letterSpacing: "0.5px" }}>
                            {pokemon.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#718096", mb: 2 }}>
                            #{String(pokemon.id).padStart(4, '0')}
                          </Typography>

                          <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", justifyContent: "center" }}>
                            {pokemon.types.map((t) => (
                              <Chip 
                                key={t} 
                                label={t.toUpperCase()} 
                                size="small" 
                                sx={{ 
                                  fontSize: "0.65rem", 
                                  fontWeight: "bold", 
                                  color: "#fff", 
                                  bgcolor: getTypeColor(t),
                                  boxShadow: `0 2px 6px ${getTypeColor(t)}44`
                                }} 
                              />
                            ))}
                            <Chip 
                              label={pokemon.tier} 
                              size="small" 
                              sx={{ 
                                fontSize: "0.65rem", 
                                fontWeight: "800", 
                                bgcolor: "#1a202c", 
                                color: "#ffffff" 
                              }} 
                            />
                          </Box>
                        </CardContent>
                      </Box>
                    </Link>
                  </Card>
                </Grid>
              ))}

          {!loadingList && !loadingDetails && displayedPokemon.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ width: "100%", py: 8, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.4)" }}>❌ ไม่พบข้อมูลโปเกมอนตามเงื่อนไข</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'rgba(255,255,255,0.7)', 
                  borderColor: "rgba(255,255,255,0.1)",
                  '&.Mui-selected': {
                    color: '#fff',
                    backgroundColor: '#ff4d4d',
                    '&:hover': { backgroundColor: '#ff3333' }
                  },
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}