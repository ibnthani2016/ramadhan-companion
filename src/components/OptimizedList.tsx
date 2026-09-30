// Optimized FlatList Component
import React, { useCallback, memo } from 'react';
import { FlatList, FlatListProps, View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface OptimizedListProps<T> extends FlatListProps<T> {
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  loadingMessage?: string;
}

function OptimizedList<T>({
  loading = false,
  error,
  emptyMessage = 'No items found',
  loadingMessage = 'Loading...',
  ...props
}: OptimizedListProps<T>) {
  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyMessage}</Text>
    </View>
  ), [emptyMessage]);

  const renderLoading = useCallback(() => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1E88E5" />
      <Text style={styles.loadingText}>{loadingMessage}</Text>
    </View>
  ), [loadingMessage]);

  const renderError = useCallback(() => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error || 'An error occurred'}</Text>
    </View>
  ), [error]);

  if (loading) return renderLoading();
  if (error) return renderError();

  return (
    <FlatList
      {...props}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
      updateCellsBatchingPeriod={50}
      getItemLayout={props.getItemLayout}
      // Styling
      contentContainerStyle={props.contentContainerStyle || styles.listContent}
      showsVerticalScrollIndicator={false}
      // Empty handling
      ListEmptyComponent={renderEmpty}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fef2f2',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
});

// Memoize for performance
export default memo(OptimizedList);
