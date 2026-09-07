import { useState } from 'react';
import { Plus, Calendar, FileText, Users, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'in-progress' | 'submitted';
  progress: number;
  dueDate: string;
  teamMembers: number;
}

interface Defense {
  id: string;
  projectTitle: string;
  date: string;
  time: string;
  room: string;
  status: 'scheduled' | 'completed' | 'pending';
  evaluators: number;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Chat Application',
    description: 'Building a real-time chat app with AI message suggestions',
    status: 'in-progress',
    progress: 65,
    dueDate: '2026-10-15',
    teamMembers: 3,
  },
  {
    id: '2',
    title: 'Mobile Weather App',
    description: 'Cross-platform weather application with real-time updates',
    status: 'submitted',
    progress: 100,
    dueDate: '2026-09-20',
    teamMembers: 2,
  },
  {
    id: '3',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    status: 'draft',
    progress: 20,
    dueDate: '2026-11-30',
    teamMembers: 4,
  },
];

const sampleDefenses: Defense[] = [
  {
    id: '1',
    projectTitle: 'Mobile Weather App',
    date: '2026-09-25',
    time: '10:00 AM',
    room: 'Room 301',
    status: 'scheduled',
    evaluators: 3,
  },
  {
    id: '2',
    projectTitle: 'AI-Powered Chat Application',
    date: '2026-10-20',
    time: '2:00 PM',
    room: 'Room 205',
    status: 'pending',
    evaluators: 2,
  },
];

export default function Index() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [defenses, setDefenses] = useState<Defense[]>(sampleDefenses);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const handleAddProject = () => {
    if (newProjectTitle.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        title: newProjectTitle,
        description: newProjectDesc,
        status: 'draft',
        progress: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        teamMembers: 1,
      };
      setProjects([...projects, newProject]);
      setNewProjectTitle('');
      setNewProjectDesc('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Project Hub</h1>
              <p className="text-slate-600 mt-2">Manage your academic projects and defenses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="text-lg font-semibold text-slate-900">Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="defenses">Defenses</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">My Projects</h2>
                <p className="text-slate-600 mt-1">Track and manage your academic projects</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>Start a new project by filling in the details below</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter project title"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project"
                        value={newProjectDesc}
                        onChange={(e) => setNewProjectDesc(e.target.value)}
                        className="min-h-24"
                      />
                    </div>
                    <Button onClick={handleAddProject} className="w-full bg-blue-600 hover:bg-blue-700">
                      Create Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge className={`mt-2 ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{project.description}</p>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-semibold text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{project.teamMembers} members</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Defenses Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Project Defenses</h2>
              <p className="text-slate-600 mt-1">Schedule and track your project defense sessions</p>
            </div>

            <div className="space-y-4">
              {defenses.map((defense) => (
                <Card key={defense.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{defense.projectTitle}</h3>
                          <Badge className={getStatusColor(defense.status)}>
                            {defense.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-xs text-slate-600">Date</p>
                              <p className="text-sm font-medium text-slate-900">
                                {new Date(defense.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-xs text-slate-600">Time</p>
                              <p className="text-sm font-medium text-slate-900">{defense.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-xs text-slate-600">Location</p>
                              <p className="text-sm font-medium text-slate-900">{defense.room}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-xs text-slate-600">Evaluators</p>
                              <p className="text-sm font-medium text-slate-900">{defense.evaluators}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {defense.status === 'completed' ? (
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        ) : (
                          <Clock className="w-8 h-8 text-amber-500" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Placeholder for scheduling */}
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Schedule a Defense</p>
                  <p className="text-sm text-slate-500 mt-1">Coming soon - Schedule your project defense session</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-600">
            Project Hub • Manage your academic projects and defenses in one place
          </p>
        </div>
      </div>
    </div>
  );
}
