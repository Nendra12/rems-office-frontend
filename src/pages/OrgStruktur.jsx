import React, { useState } from 'react';
import {
  Box, Typography, Paper, IconButton, Stack,
  Card, CardContent, Avatar, Chip, TextField, InputAdornment
} from '@mui/material';
import {
  KeyboardArrowDown, KeyboardArrowRight, Business,
  Storefront, Engineering, Person, Search
} from '@mui/icons-material';

const initialOrg = [
  {
    id: 'sup-1',
    role: 'Supervisor Area A',
    name: 'Budi Santoso',
    level: 'Supervisor',
    type: 'supervisor',
    children: [
      { id: 'kt-1', role: 'Kepala Toko 01', name: 'Andi Fauzi', level: 'Kepala Toko', type: 'head', children: [{ id: 'h-1', role: 'Helper', name: 'Sutejo', level: 'Staff', type: 'helper' }] },
      { id: 'kt-2', role: 'Kepala Toko 02', name: 'Bambang', level: 'Kepala Toko', type: 'head', children: [] },
      { id: 'kt-3', role: 'Kepala Toko 03', name: 'Cici', level: 'Kepala Toko', type: 'head', children: [] },
      { id: 'kt-4', role: 'Kepala Toko 04', name: 'Dedi', level: 'Kepala Toko', type: 'head', children: [] },
      { id: 'kt-5', role: 'Kepala Toko 05', name: 'Erna', level: 'Kepala Toko', type: 'head', children: [] },
    ]
  }
];

// Komponen Item Struktur (Recursive)
const OrgItem = ({ node, depth = 0 }) => {
  const [open, setOpen] = useState(depth < 1); // Otomatis buka level pertama saja
  const hasChildren = node.children && node.children.length > 0;

  // Menentukan Ikon Berdasarkan Tipe
  const getIcon = () => {
    if (node.type === 'supervisor') return <Person sx={{ fontSize: 20 }} />;
    if (node.type === 'head') return <Storefront sx={{ fontSize: 18 }} />;
    return <Engineering sx={{ fontSize: 16 }} />;
  };

  return (
    <Box sx={{ ml: { xs: 1, sm: depth * 4 }, mt: 2 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderLeft: node.type === 'supervisor' ? '6px solid #1976d2' : '1px solid #e0e0e0',
          transition: '0.2s',
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
        }}
      >
        <CardContent sx={{ p: '12px !important' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* Tombol Expand */}
              <Box sx={{ width: 32 }}>
                {hasChildren && (
                  <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                  </IconButton>
                )}
              </Box>

              <Avatar sx={{ bgcolor: node.type === 'supervisor' ? 'primary.main' : 'grey.500', width: 32, height: 32 }}>
                {getIcon()}
              </Avatar>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: node.type === 'supervisor' ? '1rem' : '0.875rem' }}>
                  {node.role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {node.name}
                </Typography>
              </Box>

              <Chip
                label={node.level}
                size="small"
                color={node.type === 'supervisor' ? 'primary' : 'default'}
                variant="outlined"
                sx={{ display: { xs: 'none', sm: 'flex' }, height: 20, fontSize: '10px' }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Anak Perusahaan (Recursive) */}
      {open && hasChildren && (
        <Box sx={{ borderLeft: '1px dashed #ccc', ml: 4 }}>
          {node.children.map((child) => (
            <OrgItem key={child.id} node={child} depth={1} />
          ))}
        </Box>
      )}
    </Box>
  );
};

function OrgStruktur() {
  const [searchQuery, setSearchQuery] = useState('');
  const filterNode = (node, query) => {
    if (!query) return node;

    const matchesQuery =
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      node.role.toLowerCase().includes(query.toLowerCase()) ||
      node.level.toLowerCase().includes(query.toLowerCase());

    const filteredChildren = node.children
      ? node.children.map(child => filterNode(child, query)).filter(Boolean)
      : [];

    if (matchesQuery || filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }

    return null;
  };

  const filteredOrg = initialOrg
    .map(root => filterNode(root, searchQuery))
    .filter(Boolean);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#fbfbfb', minHeight: '100vh' }}>

      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Business color="primary" />
            <Typography variant="h5" fontWeight="bold">Manajemen Struktur Area</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Hierarki: Supervisor &gt; Kepala Toko &gt; Helper
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Cari nama, role, atau level..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            minWidth: { xs: '100%', sm: 300 },
            bgcolor: 'white',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Paper sx={{ p: { xs: 1, sm: 3 }, borderRadius: 4, minHeight: '400px', bgcolor: 'transparent', boxShadow: 'none' }}>
        {filteredOrg.length > 0 ? (
          filteredOrg.map((root) => (
            <OrgItem key={root.id} node={root} />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              Tidak ada hasil yang ditemukan untuk "{searchQuery}"
            </Typography>
          </Box>
        )}
      </Paper>

    </Box>
  );
}

export default OrgStruktur;