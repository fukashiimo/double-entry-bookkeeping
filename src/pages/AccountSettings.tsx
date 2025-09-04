import { useState } from 'react';
import {
  Stack,
  Title,
  Paper,
  Button,
  Group,
  Text,
  ActionIcon,
  Modal,
  Select,
  TextInput,
  Divider,
  List,
  Box,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconDots,
} from '@tabler/icons-react';

// 勘定科目の種類の定義
const ACCOUNT_TYPES = {
  ASSETS: '資産',
  LIABILITIES: '負債',
  EQUITY: '純資産',
  REVENUE: '収益',
  EXPENSES: '費用',
} as const;

// サンプルデータ
const initialAccounts = {
  [ACCOUNT_TYPES.ASSETS]: [
    { id: 1, name: '現金' },
    { id: 2, name: '普通預金' },
    { id: 3, name: '有価証券' },
    { id: 4, name: '建物' },
    { id: 5, name: '車両' },
  ],
  [ACCOUNT_TYPES.LIABILITIES]: [
    { id: 6, name: '借入金' },
  ],
  [ACCOUNT_TYPES.EQUITY]: [
    { id: 7, name: '利益金' },
  ],
  [ACCOUNT_TYPES.REVENUE]: [
    { id: 8, name: '給与' },
    { id: 9, name: '雑収入' },
  ],
  [ACCOUNT_TYPES.EXPENSES]: [
    { id: 10, name: '会費' },
    { id: 11, name: '水道光熱費' },
    { id: 12, name: '家賃' },
  ],
};

export default function AccountSettings() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [accountName, setAccountName] = useState('');
  const [editingAccount, setEditingAccount] = useState<{ type: string; id: number } | null>(null);

  const handleAddAccount = () => {
    if (!selectedType || !accountName.trim()) return;

    const newAccount = {
      id: Math.max(...Object.values(accounts).flat().map(a => a.id)) + 1,
      name: accountName,
    };

    setAccounts(prev => ({
      ...prev,
      [selectedType]: [...prev[selectedType], newAccount],
    }));

    setSelectedType(null);
    setAccountName('');
    close();
  };

  const handleEditAccount = (type: string, account: { id: number; name: string }) => {
    setSelectedType(type);
    setAccountName(account.name);
    setEditingAccount({ type, id: account.id });
    open();
  };

  const handleSaveEdit = () => {
    if (!editingAccount || !accountName.trim()) return;

    setAccounts(prev => ({
      ...prev,
      [editingAccount.type]: prev[editingAccount.type].map(account =>
        account.id === editingAccount.id ? { ...account, name: accountName } : account
      ),
    }));

    setEditingAccount(null);
    setAccountName('');
    close();
  };

  const handleDeleteAccount = (type: string, accountId: number) => {
    setAccounts(prev => ({
      ...prev,
      [type]: prev[type].filter(account => account.id !== accountId),
    }));
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>勘定科目設定</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={open}>
          追加する
        </Button>
      </Group>

      <Paper shadow="xs" p="md" radius="md">
        {Object.entries(accounts).map(([type, accountList]) => (
          <Box key={type} mb="lg">
            <Title order={4} mb="sm">{type}</Title>
            <List spacing="xs" size="sm">
              {accountList.map(account => (
                <List.Item
                  key={account.id}
                  icon={
                    <Menu position="bottom-start">
                      <Menu.Target>
                        <ActionIcon size="sm" variant="subtle">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEdit size={16} />}
                          onClick={() => handleEditAccount(type, account)}
                        >
                          編集
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconTrash size={16} />}
                          color="red"
                          onClick={() => handleDeleteAccount(type, account.id)}
                        >
                          削除
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  }
                >
                  {account.name}
                </List.Item>
              ))}
            </List>
          </Box>
        ))}
      </Paper>

      {/* 追加・編集モーダル */}
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setEditingAccount(null);
          setSelectedType(null);
          setAccountName('');
        }}
        title={editingAccount ? "勘定科目の編集" : "勘定科目の追加"}
        size="md"
      >
        <Stack gap="md">
          <Select
            label="資産・負債・純資産の選択"
            placeholder="種類を選択してください"
            data={Object.entries(ACCOUNT_TYPES).map(([_, value]) => ({ value, label: value }))}
            value={selectedType}
            onChange={setSelectedType}
            disabled={!!editingAccount}
            required
          />
          <TextInput
            label="勘定科目名の入力"
            placeholder="科目名を入力してください"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={close}>キャンセル</Button>
            <Button onClick={editingAccount ? handleSaveEdit : handleAddAccount}>
              {editingAccount ? "保存" : "追加"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}

