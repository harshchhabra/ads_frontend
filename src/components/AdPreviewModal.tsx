import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import ReactPlayer from 'react-player';

interface AdPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  ad: Ad;
}

const ABU_DHABI_POPULATION = 1500000; // Approximate population as of 2024

export function AdPreviewModal({ isOpen, onClose, ad }: AdPreviewModalProps) {
  const engagement = ad.engagement_metrics;
  const engagementRate = engagement.views > 0 
    ? ((engagement.likes / engagement.views) * 100).toFixed(2)
    : '0.00';
  
  const reachScore = ((engagement.views / ABU_DHABI_POPULATION) * 100).toFixed(2);
  const hashtags = ad.hashtags || [];
  const musicInfo = ad.music_info;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    {ad.advertiser}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="aspect-video w-full mb-6 bg-gray-100 rounded-lg overflow-hidden">
                  {ad.media_type === 'video' ? (
                    <ReactPlayer
                      url={ad.media_urls[0]}
                      width="100%"
                      height="100%"
                      controls
                      playing
                    />
                  ) : (
                    <img
                      src={ad.media_urls[0]}
                      alt={ad.advertiser}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{engagementRate}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {engagement.comments.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Likes</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {engagement.likes.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Reach Score</p>
                    <p className="text-xl font-semibold text-gray-900">{reachScore}%</p>
                  </div>
                </div>
                {/* Platform-specific content */}
                {hashtags.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Hashtags</p>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {musicInfo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Music</p>
                    <p className="text-sm text-gray-700">
                      {musicInfo.title} - {musicInfo.artist}
                    </p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}