// Media Player Screen - Full video/audio playback
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { SAMPLE_MEDIA } from '../services/MediaService';
import { MediaItem } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MediaPlayerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { mediaId } = route.params || {};

  const videoRef = useRef<Video>(null);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Find media by ID or use first sample
    const foundMedia = SAMPLE_MEDIA.find(m => m.id === mediaId) || SAMPLE_MEDIA[0];
    setMedia(foundMedia);
  }, [mediaId]);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    
    if (status?.isLoaded) {
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  };

  const handleSeek = async (direction: 'forward' | 'backward') => {
    if (!videoRef.current || !status?.isLoaded) return;
    
    const newPosition = status.positionMillis + (direction === 'forward' ? 10000 : -10000);
    await videoRef.current.setPositionAsync(Math.max(0, newPosition));
  };

  const formatTime = (millis: number): string => {
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
        {/* Video Player */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => setShowControls(!showControls)}
          style={styles.videoContainer}
        >
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: media.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={false}
            onLoadStart={() => setIsLoading(true)}
            onLoad={(status) => {
              setIsLoading(false);
              setStatus(status);
            }}
            onPlaybackStatusUpdate={(status) => setStatus(status)}
          />
          
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        {/* Media Info */}
        <View style={styles.infoSection}>
          <Text style={styles.mediaTitle}>{media.title}</Text>
          {media.description && (
            <Text style={styles.mediaDescription}>{media.description}</Text>
          )}
          
          {/* Progress Bar */}
          {status?.isLoaded && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(status.positionMillis / (status.durationMillis || 1)) * 100}%` }
                  ]} 
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTime(status.positionMillis)}
                </Text>
                <Text style={styles.timeText}>
                  {formatTime(status.durationMillis || 0)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="#1E88E5" />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#1E88E5" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={24} color="#1E88E5" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* Related Videos */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Related Content</Text>
          {SAMPLE_MEDIA.filter(m => m.id !== media.id).slice(0, 3).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.relatedItem}
              onPress={() => navigation.push('MediaPlayer', { mediaId: item.id })}
            >
              <View style={styles.relatedThumbnail}>
                <Ionicons name="play-circle" size={32} color="#1E88E5" />
              </View>
              <View style={styles.relatedInfo}>
                <Text style={styles.relatedTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.relatedDuration}>
                  {item.duration ? `${Math.floor(item.duration / 60)} min` : 'Video'}
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
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#1E88E5',
  },
  headerButton: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  videoContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.5625, // 16:9 aspect ratio
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  mediaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  mediaDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1E88E5',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#1E88E5',
    marginTop: 4,
  },
  relatedSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  relatedThumbnail: {
    width: 120,
    height: 70,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  relatedTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  relatedDuration: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
