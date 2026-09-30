// Media Player Screen - Powered by expo-video (SDK 54 native player)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { SAMPLE_MEDIA } from '../services/MediaService';
import { MediaItem } from '../types';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MediaPlayerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { mediaId } = route.params || {};

  const [media, setMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const foundMedia = SAMPLE_MEDIA.find(m => m.id === mediaId) || SAMPLE_MEDIA[0];
    setMedia(foundMedia);
  }, [mediaId]);

  // Determine the playable source (prefer video, fall back to audio)
  const source = media?.videoUrl || media?.audioUrl || '';

  // Create the player — this hook manages the native player instance
  const player = useVideoPlayer(source, (p) => {
    p.timeUpdateEventInterval = 0.5; // Emit progress every 500ms
  });

  // Reactive playback state
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Poll progress (simple, works on all platforms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (player.duration > 0) {
        setPosition(player.currentTime);
        setDuration(player.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [player]);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleSeek = (direction: 'forward' | 'backward') => {
    const newPosition = position + (direction === 'forward' ? 10 : -10);
    player.currentTime = Math.max(0, Math.min(newPosition, duration || 0));
  };

  const handleShare = async () => {
    if (!media) return;
    try {
      await Share.share({
        message: `${media.title}\n${source}`,
      });
    } catch {
      // User dismissed share sheet
    }
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!media) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Media Player</Text>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Media not found</Text>
        </View>
      </View>
    );
  }

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{media.title}</Text>
        <View style={styles.headerButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video/Audio Player — expo-video with native controls */}
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            contentFit="contain"
            nativeControls
          />
        </View>

        {/* Custom Controls Row */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handleSeek('backward')}>
            <Ionicons name="play-back" size={28} color={colors.primary} />
            <Text style={styles.controlLabel}>10s</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={() => handleSeek('forward')}>
            <Ionicons name="play-forward" size={28} color={colors.primary} />
            <Text style={styles.controlLabel}>10s</Text>
          </TouchableOpacity>
        </View>

        {/* Media Info */}
        <View style={styles.infoSection}>
          <Text style={styles.mediaTitle}>{media.title}</Text>
          {media.description ? (
            <Text style={styles.mediaDescription}>{media.description}</Text>
          ) : null}

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={24} color={colors.primary} />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* Related Content */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Related Content</Text>
          {SAMPLE_MEDIA.filter(m => m.id !== media.id).slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedItem}
              onPress={() => navigation.push('MediaPlayer', { mediaId: item.id })}
            >
              <View style={styles.relatedThumbnail}>
                <Ionicons
                  name={item.videoUrl ? 'play-circle' : 'musical-notes'}
                  size={32}
                  color={colors.primary}
                />
              </View>
              <View style={styles.relatedInfo}>
                <Text style={styles.relatedTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.relatedDuration}>
                  {item.duration ? formatTime(item.duration) : 'Media'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingTop: 50,
    backgroundColor: colors.primary,
  },
  headerButton: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textOnPrimary,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.5625, // 16:9
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: 32,
    backgroundColor: colors.background,
  },
  controlButton: {
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  infoSection: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  mediaTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  mediaDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  progressContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    marginHorizontal: spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  relatedSection: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  relatedItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  relatedThumbnail: {
    width: 120,
    height: 70,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  relatedInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  relatedTitle: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  relatedDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MediaPlayerScreen;
