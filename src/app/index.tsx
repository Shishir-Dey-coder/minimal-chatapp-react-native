import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Conversation = {
  id: string;
  name: string;
  username: string;
  message: string;
  time: string;
  initials: string;
  color: string;
  unreadCount: number;
  online: boolean;
  isGroup?: boolean;
  isTyping?: boolean;
};

type FilterType = 'All' | 'Unread' | 'Groups';

const COLORS = {
  background: '#F8F9FC',
  surface: '#FFFFFF',
  primary: '#6750E8',
  primaryLight: '#EEEAFE',
  text: '#191A2A',
  secondary: '#85869A',
  border: '#ECECF3',
  online: '#32C982',
  muted: '#A8A9B9',
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    username: '@alexmorgan',
    message: 'That sounds like a great idea! 🚀',
    time: 'Now',
    initials: 'AM',
    color: '#DCD5FF',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    username: '@sarahchen',
    message: 'Sent you the design files.',
    time: '2m',
    initials: 'SC',
    color: '#FFDCCB',
    unreadCount: 1,
    online: true,
  },
  {
    id: '3',
    name: 'Dev Community',
    username: '@devcommunity',
    message: 'Jamie: The new build is ready.',
    time: '12m',
    initials: 'DC',
    color: '#D0F1E4',
    unreadCount: 5,
    online: false,
    isGroup: true,
  },
  {
    id: '4',
    name: 'Jordan Lee',
    username: '@jordanlee',
    message: 'Are we still meeting tomorrow?',
    time: '35m',
    initials: 'JL',
    color: '#FFE6A8',
    unreadCount: 0,
    online: true,
  },
  {
    id: '5',
    name: 'Taylor Brooks',
    username: '@taylorbrooks',
    message: 'Haha, that was hilarious 😂',
    time: '1h',
    initials: 'TB',
    color: '#F8D7E8',
    unreadCount: 0,
    online: false,
  },
  {
    id: '6',
    name: 'Design Buddies',
    username: '@designbuddies',
    message: 'Mia: Check out this new concept!',
    time: '3h',
    initials: 'DB',
    color: '#D9E8FF',
    unreadCount: 0,
    online: false,
    isGroup: true,
  },
];

const ONLINE_CONTACTS = [
  { id: '1', name: 'Alex', initials: 'AM', color: '#DCD5FF' },
  { id: '2', name: 'Sarah', initials: 'SC', color: '#FFDCCB' },
  { id: '3', name: 'Jordan', initials: 'JL', color: '#FFE6A8' },
  { id: '4', name: 'Casey', initials: 'CW', color: '#D0F1E4' },
  { id: '5', name: 'Morgan', initials: 'MR', color: '#F8D7E8' },
];

function Avatar({
  initials,
  color,
  size = 54,
  online = false,
  group = false,
}: {
  initials: string;
  color: string;
  size?: number;
  online?: boolean;
  group?: boolean;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: group ? 18 : size / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.avatarInitials,
          { fontSize: size * 0.28 },
        ]}
      >
        {initials}
      </Text>

      {online && (
        <View
          style={[
            styles.onlineIndicator,
            {
              width: size * 0.22,
              height: size * 0.22,
              borderRadius: size,
            },
          ]}
        />
      )}
    </View>
  );
}

function SectionHeading({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action && (
        <Pressable onPress={onPress} hitSlop={8}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

function ConversationRow({
  conversation,
  onPress,
}: {
  conversation: Conversation;
  onPress: () => void;
}) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open conversation with ${conversation.name}`}
      style={({ pressed }) => [
        styles.conversationRow,
        pressed && styles.pressed,
      ]}
    >
      <Avatar
        initials={conversation.initials}
        color={conversation.color}
        size={54}
        online={conversation.online}
        group={conversation.isGroup}
      />

      <View style={styles.conversationContent}>
        <View style={styles.conversationTopLine}>
          <Text
            numberOfLines={1}
            style={[
              styles.conversationName,
              hasUnread && styles.unreadText,
            ]}
          >
            {conversation.name}
          </Text>

          <Text
            style={[
              styles.messageTime,
              hasUnread && styles.unreadTime,
            ]}
          >
            {conversation.time}
          </Text>
        </View>

        <View style={styles.conversationBottomLine}>
          <Text
            numberOfLines={1}
            style={[
              styles.lastMessage,
              hasUnread && styles.unreadMessage,
            ]}
          >
            {conversation.isTyping
              ? 'Typing...'
              : conversation.message}
          </Text>

          {hasUnread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {conversation.unreadCount > 99
                  ? '99+'
                  : conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] =
    useState<FilterType>('All');
  const [activeTab, setActiveTab] = useState('Chats');

  const conversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return INITIAL_CONVERSATIONS.filter((conversation) => {
      const matchesSearch =
        conversation.name.toLowerCase().includes(query) ||
        conversation.username.toLowerCase().includes(query) ||
        conversation.message.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Unread' &&
          conversation.unreadCount > 0) ||
        (activeFilter === 'Groups' && conversation.isGroup);

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  function handleConversationPress(conversation: Conversation) {
    // Navigation will be added in the next development step.
    console.log(`Selected conversation: ${conversation.id}`);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.screen}>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationRow
              conversation={item}
              onPress={() => handleConversationPress(item)}
            />
          )}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              {/* Header */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.eyebrow}>YOUR SPACE</Text>
                  <Text style={styles.headerTitle}>Messages</Text>
                  <Text style={styles.headerSubtitle}>
                    Stay close to your people.
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Your profile"
                  onPress={() => setActiveTab('Profile')}
                  style={styles.profileButton}
                >
                  <Text style={styles.profileInitials}>SD</Text>
                  <View style={styles.profileOnline} />
                </Pressable>
              </View>

              {/* Search */}
              <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>⌕</Text>

                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search conversations..."
                  placeholderTextColor={COLORS.muted}
                  style={styles.searchInput}
                  returnKeyType="search"
                  accessibilityLabel="Search conversations"
                />

                {searchQuery.length > 0 && (
                  <Pressable
                    onPress={() => setSearchQuery('')}
                    accessibilityLabel="Clear search"
                    hitSlop={10}
                  >
                    <Text style={styles.clearSearch}>×</Text>
                  </Pressable>
                )}
              </View>

              {/* Online contacts */}
              <View style={styles.onlineSection}>
                <SectionHeading
                  title="Active now"
                  action="See all"
                  onPress={() => setActiveTab('Contacts')}
                />

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contactsList}
                >
                  {ONLINE_CONTACTS.map((contact) => (
                    <Pressable
                      key={contact.id}
                      style={styles.contactItem}
                      onPress={() =>
                        console.log(`Selected contact: ${contact.name}`)
                      }
                      accessibilityRole="button"
                      accessibilityLabel={`Message ${contact.name}`}
                    >
                      <Avatar
                        initials={contact.initials}
                        color={contact.color}
                        size={58}
                        online
                      />
                      <Text
                        numberOfLines={1}
                        style={styles.contactName}
                      >
                        {contact.name}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Conversation heading */}
              <View style={styles.listHeading}>
                <SectionHeading title="Recent chats" />

                <View style={styles.filterRow}>
                  {(['All', 'Unread', 'Groups'] as FilterType[]).map(
                    (filter) => {
                      const isActive = activeFilter === filter;

                      return (
                        <Pressable
                          key={filter}
                          onPress={() => setActiveFilter(filter)}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isActive }}
                          style={[
                            styles.filterChip,
                            isActive && styles.activeFilterChip,
                          ]}
                        >
                          <Text
                            style={[
                              styles.filterText,
                              isActive && styles.activeFilterText,
                            ]}
                          >
                            {filter}
                          </Text>
                        </Pressable>
                      );
                    },
                  )}
                </View>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>⌕</Text>
              <Text style={styles.emptyTitle}>No conversations found</Text>
              <Text style={styles.emptySubtitle}>
                Try another search or change your filter.
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />

        {/* Bottom navigation */}
        <View style={styles.bottomNav}>
          {[
            { label: 'Chats', icon: '▤' },
            { label: 'Contacts', icon: '♧' },
            { label: 'Profile', icon: '◎' },
          ].map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <Pressable
                key={tab.label}
                onPress={() => setActiveTab(tab.label)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                style={styles.navItem}
              >
                <View
                  style={[
                    styles.navIconContainer,
                    isActive && styles.activeNavIconContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.navIcon,
                      isActive && styles.activeNavIcon,
                    ]}
                  >
                    {tab.icon}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.activeNavLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.2,
    color: COLORS.primary,
    marginBottom: 7,
  },
  headerTitle: {
    fontSize: 31,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1.1,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.secondary,
    marginTop: 5,
  },
  profileButton: {
    width: 49,
    height: 49,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  profileOnline: {
    position: 'absolute',
    width: 11,
    height: 11,
    borderRadius: 6,
    right: -1,
    bottom: -1,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  searchContainer: {
    height: 54,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    fontSize: 29,
    color: COLORS.secondary,
    marginRight: 10,
    marginTop: -5,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: COLORS.text,
  },
  clearSearch: {
    fontSize: 25,
    color: COLORS.secondary,
    paddingHorizontal: 3,
  },
  onlineSection: {
    marginTop: 31,
  },
  sectionHeading: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.35,
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  contactsList: {
    paddingHorizontal: 24,
    paddingTop: 19,
    paddingBottom: 4,
    gap: 23,
  },
  contactItem: {
    alignItems: 'center',
    width: 59,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarInitials: {
    fontWeight: '800',
    color: '#353047',
    letterSpacing: -0.5,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  contactName: {
    marginTop: 9,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.secondary,
    maxWidth: 65,
  },
  listHeading: {
    marginTop: 29,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 9,
    marginTop: 15,
  },
  filterChip: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  conversationRow: {
    minHeight: 82,
    paddingHorizontal: 24,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  pressed: {
    opacity: 0.7,
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  conversationTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conversationName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  unreadText: {
    fontWeight: '800',
  },
  messageTime: {
    fontSize: 10,
    color: COLORS.secondary,
  },
  unreadTime: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  conversationBottomLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 12,
    color: COLORS.secondary,
  },
  unreadMessage: {
    color: '#55566A',
    fontWeight: '600',
  },
  unreadBadge: {
    minWidth: 21,
    height: 21,
    paddingHorizontal: 5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 91,
    marginRight: 24,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingTop: 48,
    paddingBottom: 50,
  },
  emptyIcon: {
    fontSize: 42,
    color: COLORS.muted,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 12,
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
  bottomNav: {
    minHeight: 76,
    paddingTop: 9,
    paddingBottom: 5,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navItem: {
    minWidth: 68,
    alignItems: 'center',
    gap: 4,
  },
  navIconContainer: {
    width: 43,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavIconContainer: {
    backgroundColor: COLORS.primaryLight,
  },
  navIcon: {
    fontSize: 21,
    color: COLORS.secondary,
  },
  activeNavIcon: {
    color: COLORS.primary,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  activeNavLabel: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
