import { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Search, Heart, MessageCircle, Share, MoreHorizontal, Plus, Bell, Home, Hash, User, Send, Image as ImageIcon, AtSign } from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  topic?: string;
  images?: string[];
}

interface Topic {
  id: string;
  name: string;
  postCount: string;
  trending: boolean;
}

const mockPosts: Post[] = [
{
  id: '1',
  author: {
    name: '科技达人',
    username: 'techguru',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    verified: true
  },
  content: '今天分享一个关于AI发展的思考，人工智能正在快速改变我们的生活方式，从工作到娱乐，无处不在。大家觉得未来10年AI会带来什么样的变化？ #AI技术 #未来科技',
  timestamp: '2小时前',
  likes: 234,
  comments: 45,
  shares: 12,
  topic: 'AI技术',
  images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400']
},
{
  id: '2',
  author: {
    name: '设计师小王',
    username: 'designer_wang',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c5?w=100',
    verified: false
  },
  content: '刚完成一个新的UI设计项目，深色主题真的很有挑战性，既要保证视觉舒适度，又要确保信息层次清晰。分享一些设计心得... #UI设计 #深色主题',
  timestamp: '4小时前',
  likes: 156,
  comments: 28,
  shares: 8,
  topic: 'UI设计'
},
{
  id: '3',
  author: {
    name: '生活记录者',
    username: 'life_recorder',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    verified: false
  },
  content: '今天的晚霞特别美，工作一天后看到这样的景色，瞬间心情就好了起来。生活中的小美好总是能给人力量 ✨ #生活日记 #晚霞',
  timestamp: '6小时前',
  likes: 89,
  comments: 15,
  shares: 3,
  topic: '生活日记',
  images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400']
}];


const trendingTopics: Topic[] = [
{ id: '1', name: 'AI技术', postCount: '12.5万', trending: true },
{ id: '2', name: 'UI设计', postCount: '8.7万', trending: true },
{ id: '3', name: '生活日记', postCount: '15.2万', trending: false },
{ id: '4', name: '科技新闻', postCount: '9.8万', trending: true },
{ id: '5', name: '摄影分享', postCount: '6.4万', trending: false }];


export default function Index() {
  const [newPost, setNewPost] = useState('');

  const PostCard = ({ post }: {post: Post;}) => {
    return (
      <Card className="bg-gray-900 border-gray-800 text-white mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{post.author.name}</span>
                {post.author.verified &&
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                }
              </div>
              <span className="text-gray-400 text-sm">@{post.author.username} · {post.timestamp}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-gray-100 leading-relaxed mb-3">{post.content}</p>
          {post.images && post.images.length > 0 &&
          <div className="rounded-lg overflow-hidden mb-3">
              <img src={post.images[0]} alt="Post image" className="w-full max-h-80 object-cover" />
            </div>
          }
          {post.topic &&
          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30">
              #{post.topic}
            </Badge>
          }
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full text-gray-400">
            <Button variant="ghost" size="sm" className="hover:text-red-400 hover:bg-red-400/10">
              <Heart className="h-4 w-4 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-blue-400 hover:bg-blue-400/10">
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-green-400 hover:bg-green-400/10">
              <Share className="h-4 w-4 mr-1" />
              {post.shares}
            </Button>
          </div>
        </CardFooter>
      </Card>);

  };

  const Sidebar = () => {
    return (
      <div className="space-y-6">
        {/* 用户信息 */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">用户昵称</h3>
                <p className="text-gray-400 text-sm">@username</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-white">128</div>
                <div className="text-xs text-gray-400">关注</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">1.2k</div>
                <div className="text-xs text-gray-400">粉丝</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">89</div>
                <div className="text-xs text-gray-400">动态</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 热门话题 */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-white flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              热门话题
            </h3>
          </CardHeader>
          <CardContent className="p-0">
            {trendingTopics.map((topic, index) =>
            <div key={topic.id}>
                <div className="px-4 py-3 hover:bg-gray-800/50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">#{topic.name}</p>
                      <p className="text-sm text-gray-400">{topic.postCount} 讨论</p>
                    </div>
                    {topic.trending &&
                  <Badge className="bg-red-600/20 text-red-400 border-red-600/30">
                        热门
                      </Badge>
                  }
                  </div>
                </div>
                {index < trendingTopics.length - 1 && <Separator className="bg-gray-800" />}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 推荐关注 */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-white">推荐关注</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3].map((i) =>
            <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`https://images.unsplash.com/photo-150000000${i}?w=50`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">用户{i}</p>
                    <p className="text-xs text-gray-400">@user{i}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  关注
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>);

  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className='text-white text-xl font-bold'>话区</h1>
              <nav className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Home className="h-4 w-4 mr-2" />
                  首页
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <Hash className="h-4 w-4 mr-2" />
                  话题
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <User className="h-4 w-4 mr-2" />
                  个人
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索话题、用户..."
                  className="pl-10 w-64 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400" />

              </div>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧边栏 */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 发布新动态 */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="分享你的想法..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px] bg-transparent border-none text-white placeholder:text-gray-400 resize-none focus:ring-0" />

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-400/10">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          图片
                        </Button>
                        <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-400/10">
                          <Hash className="h-4 w-4 mr-1" />
                          话题
                        </Button>
                        <Button size="sm" variant="ghost" className="text-purple-400 hover:bg-purple-400/10">
                          <AtSign className="h-4 w-4 mr-1" />
                          提及
                        </Button>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700" disabled={!newPost.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        发布
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 动态列表 */}
            <div>
              {mockPosts.map((post) =>
              <PostCard key={post.id} post={post} />
              )}
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              {/* 实时动态 */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-white">实时动态</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((i) =>
                  <div key={i} className="text-sm">
                      <p className="text-gray-300">话题 #科技新闻 新增 12 条讨论</p>
                      <p className="text-gray-500 text-xs">刚刚</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 今日数据 */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-white">今日数据</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">新增讨论</span>
                    <span className="text-white font-semibold">2.3k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">活跃用户</span>
                    <span className="text-white font-semibold">15.6k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">热门话题</span>
                    <span className="text-white font-semibold">128</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 lg:hidden">
        <div className="grid grid-cols-4 gap-1">
          <Button variant="ghost" className="h-16 flex flex-col items-center justify-center text-gray-300">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1 text-red-500">首页</span>
          </Button>
          <Button variant="ghost" className="h-16 flex flex-col items-center justify-center text-gray-300">
            <Hash className="h-5 w-5" />
            <span className="text-xs mt-1">话题</span>
          </Button>
          <Button variant="ghost" className="h-16 flex flex-col items-center justify-center text-gray-300">
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">发布</span>
          </Button>
          <Button variant="ghost" className="h-16 flex flex-col items-center justify-center text-gray-300">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">我的</span>
          </Button>
        </div>
      </div>
    </div>);

}