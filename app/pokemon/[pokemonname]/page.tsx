"use client";

import { useEffect, useState, use } from "react"; 
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Skeleton
} from "@mui/material";

interface PokemonDetail {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  cries: { latest: string };
  species: { url: string };
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>; 
}) {

  const resolvedParams = use(params);
  const pokemonname = resolvedParams.pokemonname;
  
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [evolutions, setEvolutions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!pokemonname) return;

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`)
      .then((res) => res.json())
      .then(async (data: PokemonDetail) => {
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoChain: string[] = [];
        let evoDataNode = evoData.chain;
        while (evoDataNode) {
          evoChain.push(evoDataNode.species.name);
          evoDataNode = evoDataNode.evolves_to[0];
        }
        setEvolutions(evoChain);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        setLoading(false);
      });
  }, [pokemonname]);

  const playCry = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
      </Container>
    );
  }

  if (!pokemon) return <Typography sx={{ color: '#fff', p: 3 }}>ไม่พบข้อมูลโปเกมอนตัวนี้</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button 
        onClick={() => router.push('/')} 
        sx={{ mb: 3, color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
      >
        <span style={{ marginRight: '8px' }}>⬅</span>   Back to Pokédex
      </Button>

      <Card sx={{ borderRadius: 4, boxShadow: 3, overflow: "hidden", bgcolor: '#1e1e1e', color: '#fff' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          
          <Box sx={{ 
            flex: { xs: '1', md: '5' }, 
            bgcolor: "rgba(255, 255, 255, 0.05)", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            p: 4 
          }}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              style={{ width: "100%", maxWidth: "230px", height: "auto" }}
            />
            <Typography variant="h4" sx={{ textTransform: "capitalize", mt: 2, fontWeight: "bold" }}>
              {pokemon.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}>
              #{pokemon.id.toString().padStart(4, '0')}
            </Typography>
            
            {pokemon.cries?.latest && (
              <Button 
                variant="contained" 
                color="error" 
                onClick={playCry} 
                sx={{ borderRadius: 20, px: 3 }}
              >
                <span style={{ marginRight: '6px' }}>🔊</span> Play Sound
              </Button>
            )}
          </Box>

          <Box sx={{ flex: { xs: '1', md: '7' }, p: 4 }}>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>Types</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                {pokemon.types.map((t) => (
                  <Chip key={t.type.name} label={t.type.name} color="primary" sx={{ textTransform: "capitalize", fontWeight: "600" }} />
                ))}
              </Box>

              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: "bold" }}>Base Stats</Typography>
              <Box sx={{ mb: 3 }}>
                {pokemon.stats.map((s) => (
                  <Box key={s.stat.name} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ textTransform: "uppercase", color: 'rgba(255,255,255,0.7)' }}>
                        {s.stat.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1.05rem" }}>
                        {s.base_stat}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>Evolution Chain</Typography>
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                {evolutions.map((evoName, idx) => (
                  <Box key={evoName} sx={{ display: "flex", alignItems: "center" }}>
                    <Chip 
                      label={evoName} 
                      variant={evoName === pokemon.name ? "filled" : "outlined"}
                      color={evoName === pokemon.name ? "primary" : "default"}
                      sx={{ 
                        textTransform: "capitalize", 
                        cursor: 'pointer',
                        color: '#fff',
                        borderColor: evoName === pokemon.name ? 'primary.main' : 'rgba(255,255,255,0.3)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                      onClick={() => router.push(`/pokemon/${evoName}`)} 
                    />
                    {idx < evolutions.length - 1 && <Typography sx={{ mx: 1, color: "rgba(255,255,255,0.4)" }}>➔</Typography>}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Box>

        </Box>
      </Card>
    </Container>
  );
}