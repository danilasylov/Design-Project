import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip,
  IconButton, Avatar, Typography, Grid, Card, CardContent, Chip, TextField,
  InputBase, Snackbar, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem,
  Slider, Switch, Button, CssBaseline, ThemeProvider, createTheme, InputAdornment, Alert,
  Stack, FormControl, InputLabel, Divider
} from '@mui/material';
import {
  MenuOpen, ChevronLeft, ChevronRight, Dashboard as DashboardIcon, SmartToy, LibraryBooks,
  History, Phone, Payment, Extension, Settings as SettingsIcon, Logout, Search,
  InfoOutlined, ExpandMore, BarChart, PhoneInTalk, AttachMoney, AccessTime, Autorenew, PlayArrow
} from '@mui/icons-material';

// ----------------------------------------------------------------------
// THEME
// ----------------------------------------------------------------------
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo
    },
    background: {
      default: '#0f172a', // Slate 900
      paper: '#1e293b',   // Slate 800
    },
    success: {
      main: '#10b981', // Emerald
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#334155', // Slate 700
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          border: '1px solid #334155',
          borderRadius: 12,
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a',
          borderRight: '1px solid #334155',
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          border: '1px solid #334155',
          fontSize: '0.75rem',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: '1px solid #334155',
          '&:before': { display: 'none' },
          marginBottom: 8,
          borderRadius: 8,
          '&:first-of-type': { borderRadius: 8 },
          '&:last-of-type': { borderRadius: 8 },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
});

// ----------------------------------------------------------------------
// CONSTANTS & MOCKS
// ----------------------------------------------------------------------
const DRAWER_WIDTH_EXPANDED = 260;
const DRAWER_WIDTH_COLLAPSED = 65;

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Дашборд', icon: <DashboardIcon /> },
  { id: 'assistants', label: 'Ассистенты', icon: <SmartToy /> },
  { id: 'knowledge', label: 'База Знаний', icon: <LibraryBooks /> },
  { id: 'history', label: 'История звонков', icon: <History /> },
  { id: 'phones', label: 'Номера телефонов', icon: <Phone /> },
  { id: 'billing', label: 'Биллинг', icon: <Payment /> },
  { id: 'integrations', label: 'Интеграции', icon: <Extension /> },
  { id: 'settings', label: 'Настройки', icon: <SettingsIcon /> },
];

const BOT_LIST = [
  { id: 'bot_1', name: 'Sales Assistant' },
  { id: 'bot_2', name: 'Technical Support' },
  { id: 'bot_3', name: 'Survey Bot' },
];

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function DashboardPage() {
  const hasHistory = true; // Toggle for empty state demo

  return (
    <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>Обзор аналитики</Typography>
      
      {/* Топовые метрики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Всего потрачено', value: '$1,294.00', icon: <AttachMoney color="success" /> },
          { label: 'Всего минут', value: '3,420', icon: <AccessTime color="primary" /> },
          { label: 'Всего звонков', value: '1,288', icon: <PhoneInTalk color="info" /> },
          { label: 'Активные ассистенты', value: '3', icon: <Autorenew color="warning" /> },
        ].map((stat, i) => (
          <Grid item xs={3} key={i}>
            <Card>
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    {stat.label}
                  </Typography>
                  {stat.icon}
                </Box>
                <Typography variant="h4">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Блок аналитики */}
      <Grid container spacing={3}>
        {/* Использование по времени (8 cols) */}
        <Grid item xs={8}>
          <Card sx={{ height: '100%', minHeight: 400 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}>Использование по времени</Typography>
              <Box sx={{ flex: 1, border: '1px dashed', borderColor: 'divider', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box textAlign="center" color="text.secondary">
                  <BarChart sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
                  <Typography variant="body2">График загружается...</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Последние действия (4 cols) */}
        <Grid item xs={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}>Последние действия</Typography>
              {!hasHistory ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <History sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                  <Typography variant="body2">Нет истории звонков</Typography>
                </Box>
              ) : (
                <List dense disablePadding>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ListItem key={i} disableGutters sx={{ mb: 1, borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneInTalk fontSize="small" color="action" />
                          <Typography variant="body2">+1 (555) 0192-{i}</Typography>
                        </Box>
                        <Box display="flex" gap={1} alignItems="center">
                          <Chip label="2m 14s" size="small" variant="outlined" />
                          <Chip label="$0.12" size="small" color="success" variant="outlined" />
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function AssistantSettingsPage({ onAutoSave }: { onAutoSave: () => void }) {
  const [activeBot, setActiveBot] = useState<string | null>(null);

  const handleFieldChange = () => {
    // В реальном приложении здесь обновится state, а дебаунс вызовет сохранение.
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
      {/* Левая колонка списка (Master) */}
      <Box sx={{ width: 320, borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Button variant="contained" size="large" fullWidth startIcon={<SmartToy />}>
            Создать ассистента
          </Button>
          <TextField
            size="small"
            placeholder="Поиск..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
            }}
          />
        </Box>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          {BOT_LIST.map((bot) => (
            <ListItem disablePadding key={bot.id}>
              <ListItemButton
                selected={activeBot === bot.id}
                onClick={() => setActiveBot(bot.id)}
                sx={{
                  borderLeft: activeBot === bot.id ? '4px solid' : '4px solid transparent',
                  borderColor: 'primary.main',
                  bgcolor: activeBot === bot.id ? 'action.selected' : 'transparent',
                }}
              >
                <ListItemText 
                  primary={bot.name} 
                  primaryTypographyProps={{ 
                    fontWeight: activeBot === bot.id ? 700 : 400 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Правая колонка редактора (Detail) */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {!activeBot ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
            <SmartToy sx={{ fontSize: 80, mb: 2 }} />
            <Box display="flex" alignItems="center" gap={1}>
              <ChevronLeft />
              <Typography variant="h6">Выберите ассистента для настройки</Typography>
            </Box>
          </Box>
        ) : (
          <>
            {/* Sticky Header */}
            <Box sx={{ px: 4, py: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <InputBase
                  defaultValue={BOT_LIST.find(b => b.id === activeBot)?.name}
                  sx={{ fontSize: '1.5rem', fontWeight: 700, width: 300 }}
                  onBlur={onAutoSave}
                />
                <Chip label="Активен" color="success" size="small" variant="filled" />
              </Box>
              <Button variant="outlined" startIcon={<PlayArrow />} sx={{ borderColor: 'divider', color: 'text.primary' }}>
                Тест в браузере
              </Button>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
              <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                
                {/* Блок 1: Модель */}
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600}>Настройки Модели</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                        <Typography variant="body2" fontWeight={600}>Языковая модель (LLM)</Typography>
                        <Tooltip title="Выберите провайдера нейросети. Разные модели имеют разную стоимость и задержку (latency)." placement="right">
                          <InfoOutlined fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                      <Select size="small" fullWidth defaultValue="gpt-4" onChange={onAutoSave}>
                        <MenuItem value="gpt-4">OpenAI GPT-4o</MenuItem>
                        <MenuItem value="claude-3">Anthropic Claude 3.5 Sonnet</MenuItem>
                        <MenuItem value="llama-3">Meta Llama 3 70B</MenuItem>
                      </Select>
                    </Box>

                    <Box>
                      <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                        <Typography variant="body2" fontWeight={600}>Системный промпт (System Prompt)</Typography>
                        <Tooltip title="Основная инструкция, задающая персону, правила поведения и ограничения виртуального ассистента." placement="right">
                          <InfoOutlined fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                      <TextField 
                        multiline 
                        rows={6} 
                        fullWidth 
                        defaultValue="You are a helpful sales assistant. Always be polite..."
                        onBlur={onAutoSave}
                      />
                    </Box>

                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Температура (Temperature)</Typography>
                          <Tooltip title="Определяет креативность ответов. Ближе к 0 — ответы строгие и предсказуемые, ближе к 1 — более разнообразные." placement="top">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <Slider defaultValue={0.7} step={0.1} min={0} max={1} valueLabelDisplay="auto" onChangeCommitted={onAutoSave} />
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Макс. Токены (Max Tokens)</Typography>
                          <Tooltip title="Ограничение на длину генерируемого ответа в одном сообщении." placement="top">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <Slider defaultValue={250} step={50} min={50} max={1000} valueLabelDisplay="auto" onChangeCommitted={onAutoSave} />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Блок 2: Голос */}
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600}>Голос и Речь (TTS / STT)</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Синтез речи (Голос)</Typography>
                          <Tooltip title="Выбор диктора для озвучивания текста." placement="top">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <Select size="small" fullWidth defaultValue="eleven-rachel" onChange={onAutoSave}>
                          <MenuItem value="eleven-rachel">Rachel (Женский, США)</MenuItem>
                          <MenuItem value="eleven-drew">Drew (Мужской, США)</MenuItem>
                          <MenuItem value="azure-jane">Jane (Женский, UK)</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Эмоциональный стиль</Typography>
                          <Tooltip title="Модификатор интонации голоса." placement="top">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <Select size="small" fullWidth defaultValue="cheerful" onChange={onAutoSave}>
                          <MenuItem value="neutral">Нейтральный</MenuItem>
                          <MenuItem value="cheerful">Приветливый / Радостный</MenuItem>
                          <MenuItem value="professional">Строгий профессиональный</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>

                    <Box>
                      <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                        <Typography variant="body2" fontWeight={600}>Скорость речи</Typography>
                        <Tooltip title="Настройка темпа генерации голоса." placement="right">
                          <InfoOutlined fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                      <Box px={2}>
                        <Slider 
                          defaultValue={1} 
                          step={0.1} 
                          min={0.5} 
                          max={2} 
                          marks={[
                            { value: 0.5, label: 'Медленно' },
                            { value: 1, label: 'Нормально' },
                            { value: 1.5, label: 'Быстро' },
                            { value: 2, label: 'Очень быстро' },
                          ]}
                          valueLabelDisplay="auto" 
                          onChangeCommitted={onAutoSave}
                        />
                      </Box>
                    </Box>

                    <Divider />
                    
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Перебивание (Interruption)</Typography>
                          <Tooltip title="Если включено, пользователь может начать говорить во время реплики ассистента, и ассистент замолкнет." placement="right">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <Typography variant="caption" color="text.secondary">Позволить пользователю перебивать бота</Typography>
                      </Box>
                      <Switch defaultChecked onChange={onAutoSave} color="primary" />
                    </Box>
                  </AccordionDetails>
                </Accordion>

                {/* Блок 3: Интеграции & RAG */}
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight={600}>Интеграции & База знаний</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={4}>
                      {/* Левый блок (База знаний) */}
                      <Grid item xs={6} sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
                        <Box display="flex" alignItems="center" mb={2} gap={0.5}>
                          <Typography variant="body2" fontWeight={600}>Документы для RAG</Typography>
                          <Tooltip title="Ассистент будет использовать эти документы для ответов на вопросы пользователя." placement="right">
                            <InfoOutlined fontSize="small" color="action" />
                          </Tooltip>
                        </Box>
                        <List dense disablePadding>
                          {['FAQ Компании', 'Инструкция по возврату', 'Прайс-лист Q3'].map((doc) => (
                            <ListItem key={doc} disableGutters sx={{ py: 0.5 }}>
                              <ListItemText primary={doc} primaryTypographyProps={{ variant: 'body2' }} />
                              <Switch size="small" defaultChecked onChange={onAutoSave} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>

                      {/* Правый блок (Webhooks & Интеграции) */}
                      <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" gap={3}>
                          <Box>
                            <Box display="flex" alignItems="center" mb={1} gap={0.5}>
                              <Typography variant="body2" fontWeight={600}>Webhook после звонка</Typography>
                              <Tooltip title="URL, на который будет отправлен JSON с транскрипцией и метаданными после завершения вызова." placement="right">
                                <InfoOutlined fontSize="small" color="action" />
                              </Tooltip>
                            </Box>
                            <TextField 
                              size="small" 
                              fullWidth 
                              placeholder="https://api.example.com/webhook" 
                              onBlur={onAutoSave}
                            />
                          </Box>

                          <Box display="flex" alignItems="center" justifyContent="space-between" bgcolor="background.default" p={1.5} borderRadius={1} border="1px solid" borderColor="divider">
                            <Box>
                              <Typography variant="body2" fontWeight={600}>Google Calendar</Typography>
                              <Typography variant="caption" color="text.secondary">Запись на встречи</Typography>
                            </Box>
                            <Switch onChange={onAutoSave} color="primary" />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Box mb={8} /> {/* Space at bottom */}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activePage, setActivePage] = useState('assistants');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleAutoSave = () => setSnackbarOpen(true);
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', minWidth: '1200px', overflow: 'hidden', bgcolor: 'background.default' }}>
        
        {/* SIDEBAR (DRAWER) */}
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerOpen ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '& .MuiDrawer-paper': {
              width: drawerOpen ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {/* Header of Drawer */}
          <Box sx={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: drawerOpen ? 'space-between' : 'center', px: drawerOpen ? 2 : 0, borderBottom: '1px solid', borderColor: 'divider' }}>
            {drawerOpen && (
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 1 }}>
                VOICE<span style={{color: '#f8fafc'}}>AI</span>
              </Typography>
            )}
            <IconButton onClick={toggleDrawer} size="small">
              {drawerOpen ? <MenuOpen /> : <ChevronRight />}
            </IconButton>
          </Box>

          {/* Nav Links */}
          <List sx={{ pt: 2, px: drawerOpen ? 2 : 1 }}>
            {MENU_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              
              const ListItemContent = (
                <ListItemButton
                  selected={isActive}
                  onClick={() => setActivePage(item.id)}
                  sx={{
                    minHeight: 44,
                    borderRadius: 2,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                    mb: 0.5,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255, 0.04)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  {drawerOpen && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 500 }} />}
                </ListItemButton>
              );

              return (
                <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                  {!drawerOpen ? (
                    <Tooltip title={item.label} placement="right" arrow>
                      {ListItemContent}
                    </Tooltip>
                  ) : ListItemContent}
                </ListItem>
              );
            })}
          </List>

          {/* Profile Footer */}
          <Box sx={{ mt: 'auto', p: drawerOpen ? 2 : 1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: drawerOpen ? 1.5 : 0, justifyContent: 'center' }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.dark', fontSize: '0.875rem', fontWeight: 600 }}>DS</Avatar>
            {drawerOpen && (
              <>
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden' }}>Danila Sylov</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>admin@voice.ai</Typography>
                </Box>
                <IconButton size="small" color="inherit">
                  <Logout fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Drawer>

        {/* MAIN CONTENT AREA */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'assistants' && <AssistantSettingsPage onAutoSave={handleAutoSave} />}
          {activePage !== 'dashboard' && activePage !== 'assistants' && (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="text.secondary">Раздел в разработке</Typography>
            </Box>
          )}
        </Box>

      </Box>

      {/* Global Snackbar for Auto-save */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={2500} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          Настройки сохранены
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
