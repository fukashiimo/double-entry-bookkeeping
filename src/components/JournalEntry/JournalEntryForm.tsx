import { useState } from 'react';
import { Box, TextInput, NumberInput, Textarea, Button, Select, Grid, Paper, Title, ActionIcon } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconTrash, IconCopy } from '@tabler/icons-react';
import 'dayjs/locale/ja';

interface JournalEntryFormProps {
  onSubmit: (data: any) => void;
}

export const JournalEntryForm = ({ onSubmit }: JournalEntryFormProps) => {
  const [date, setDate] = useState<Date | null>(new Date());

  // 勘定科目の選択肢（実際のアプリではAPIから取得するなど）
  const accountOptions = [
    { value: '現金', label: '現金' },
    { value: '普通預金', label: '普通預金' },
    { value: '売上', label: '売上' },
    { value: '仕入', label: '仕入' },
    { value: '給料', label: '給料' },
    // 他の勘定科目...
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォームの送信処理
    onSubmit({
      date,
      // その他のフォームデータ
    });
  };

  return (
    <Paper p="md" radius="md">
      <form onSubmit={handleSubmit}>
        <Title order={2} mb="md">仕訳入力</Title>
        
        {/* 日付 */}
        <Grid mb="md">
          <Grid.Col span={4}>
            <DateInput
              label="日付"
              placeholder="日付を選択"
              value={date}
              onChange={setDate}
              locale="ja"
              required
            />
          </Grid.Col>
        </Grid>

        {/* 借方 */}
        <Grid mb="md" align="flex-end">
          <Grid.Col span={4}>
            <Select
              label="借方科目"
              placeholder="科目を選択"
              data={accountOptions}
              searchable
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="補助科目"
              placeholder="補助科目を選択"
              data={[]}
              searchable
              clearable
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <NumberInput
              label="金額"
              placeholder="金額を入力"
              required
              min={0}
              thousandSeparator=","
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon color="blue" size="lg">
              <IconCopy size={20} />
            </ActionIcon>
          </Grid.Col>
        </Grid>

        {/* 貸方 */}
        <Grid mb="md" align="flex-end">
          <Grid.Col span={4}>
            <Select
              label="貸方科目"
              placeholder="科目を選択"
              data={accountOptions}
              searchable
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="補助科目"
              placeholder="補助科目を選択"
              data={[]}
              searchable
              clearable
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <NumberInput
              label="金額"
              placeholder="金額を入力"
              required
              min={0}
              thousandSeparator=","
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon color="red" size="lg">
              <IconTrash size={20} />
            </ActionIcon>
          </Grid.Col>
        </Grid>

        {/* 摘要 */}
        <Textarea
          label="摘要"
          placeholder="取引の内容を入力"
          minRows={2}
          mb="md"
        />

        {/* メモ */}
        <Textarea
          label="メモ"
          placeholder="備考やメモを入力"
          minRows={2}
          mb="md"
        />

        {/* 送信ボタン */}
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" size="md">
            登録
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

