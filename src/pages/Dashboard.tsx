import { Grid, Paper, Text, Title, Group, Stack, Button, ActionIcon, Box, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { PieChart } from '@mantine/charts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // サンプルデータ
  const incomeData = [
    { name: '給与', value: 70, color: '#60A5FA' },
    { name: 'その他', value: 30, color: '#818CF8' },
  ];

  const expenseData = [
    { name: '家賃', value: 40, color: '#34D399' },
    { name: '食費', value: 30, color: '#6EE7B7' },
    { name: '光熱費', value: 30, color: '#A7F3D0' },
  ];

  const balanceSheetData = {
    assets: [
      { name: '現金', amount: 1000000 },
      { name: '普通預金', amount: 2000000 },
    ],
    liabilities: [
      { name: 'クレジットカード', amount: 150000 },
      { name: '住宅ローン', amount: 20000000 },
    ],
  };

  return (
    <Stack gap="xl">
      <Grid gutter="xl">
        {/* 貸借対照表 */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper shadow="sm" p="xl" radius="lg">
            <Title order={4} mb="xl">貸借対照表</Title>
            <Grid gutter="xl">
              {/* 資産 */}
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" mb="md">資産</Text>
                {balanceSheetData.assets.map((item, index) => (
                  <Group key={index} justify="space-between" mb="md">
                    <Text size="sm">{item.name}</Text>
                    <Text size="sm">{item.amount.toLocaleString()}円</Text>
                  </Group>
                ))}
                <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid #eee' }}>
                  <Text fw={500}>合計</Text>
                  <Text fw={500}>
                    {balanceSheetData.assets.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}円
                  </Text>
                </Group>
              </Grid.Col>

              {/* 負債・純資産 */}
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" mb="md">負債・純資産</Text>
                {balanceSheetData.liabilities.map((item, index) => (
                  <Group key={index} justify="space-between" mb="md">
                    <Text size="sm">{item.name}</Text>
                    <Text size="sm">{item.amount.toLocaleString()}円</Text>
                  </Group>
                ))}
                <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid #eee' }}>
                  <Text fw={500}>合計</Text>
                  <Text fw={500}>
                    {balanceSheetData.liabilities.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}円
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>

        {/* 仕訳入力ボタン */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" p="xl" radius="lg" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack align="center" gap="lg">
              <ActionIcon
                size={80}
                radius="xl"
                variant="light"
                color="blue"
                onClick={() => navigate('/journal-entry')}
                style={{ backgroundColor: '#EBF5FF' }}
              >
                <IconPlus size={40} />
              </ActionIcon>
              <Box ta="center">
                <Title order={4} mb="xs">仕訳を入力</Title>
                <Text size="sm" c="dimmed">
                  新しい取引を記録する
                </Text>
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* 今月の家計簿 */}
      <Paper shadow="sm" p="xl" radius="lg">
        <Group justify="space-between" mb="xl">
          <Title order={4}>今月の家計簿</Title>
          <Button 
            variant="subtle" 
            size="md"
            color="blue"
            style={{ color: '#3B82F6' }}
          >
            2024年3月
          </Button>
        </Group>
        
        <Grid gutter={80}>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Container size="100%" p={0}>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">収益</Text>
                    <Box w={{ base: 240, sm: 280 }} h={{ base: 240, sm: 280 }}>
                      <PieChart
                        data={incomeData}
                        withLabels
                        labelsType="percent"
                        donut
                        tooltipDataSource="segment"
                        valueFormatter={(value) => `¥${value.toLocaleString()}`}
                      />
                    </Box>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Stack align="center">
                    <Text size="sm" c="dimmed">支出</Text>
                    <Box w={{ base: 240, sm: 280 }} h={{ base: 240, sm: 280 }}>
                      <PieChart
                        data={expenseData}
                        withLabels
                        labelsType="percent"
                        donut
                        tooltipDataSource="segment"
                        valueFormatter={(value) => `¥${value.toLocaleString()}`}
                      />
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Container>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 4 }}>
            <Paper withBorder p="xl" radius="lg" style={{ height: '100%', minHeight: '280px' }}>
              <Stack justify="center" h="100%">
                <Text size="sm" c="dimmed" mb="lg">収支サマリー</Text>
                <Stack gap="lg">
                  <Group justify="space-between">
                    <Text size="sm">収益</Text>
                    <Text size="lg" fw={500}>¥350,000</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">支出</Text>
                    <Text size="lg" fw={500}>¥250,000</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">利益</Text>
                    <Text size="lg" fw={500} style={{ color: '#3B82F6' }}>¥100,000</Text>
                  </Group>
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default Dashboard;