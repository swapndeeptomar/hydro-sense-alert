import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Users, 
  Bell, 
  Shield,
  Sliders,
  UserPlus,
  Edit,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("users");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    village: ""
  });

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@HydroSense.org",
      role: "Health Administrator",
      phone: "+1-555-0123",
      village: "Lake Shore",
      status: "Active",
      lastLogin: "2024-01-15T10:30:00",
      permissions: ["View Reports", "Manage Alerts", "Village Management"]
    },
    {
      id: 2,
      name: "Ahmed Rahman",
      email: "ahmed.rahman@HydroSense.org",
      role: "Disease Specialist",
      phone: "+1-555-0124",
      village: "Multiple",
      status: "Active",
      lastLogin: "2024-01-15T09:15:00",
      permissions: ["View Reports", "Health Investigation", "Data Analysis"]
    },
    {
      id: 3,
      name: "Tech Support Team",
      email: "tech@HydroSense.org",
      role: "System Administrator",
      phone: "+1-555-0125",
      village: "All",
      status: "Active",
      lastLogin: "2024-01-15T14:45:00",
      permissions: ["Device Management", "System Configuration", "User Management"]
    },
    {
      id: 4,
      name: "Maria Santos",
      email: "maria.santos@health.gov",
      role: "Health Worker",
      phone: "+1-555-0126",
      village: "Mountain View",
      status: "Inactive",
      lastLogin: "2024-01-10T16:20:00",
      permissions: ["View Reports", "Basic Alerts"]
    }
  ]);

  // Sample system configurations
  const [systemConfig, setSystemConfig] = useState({
    alertThresholds: {
      turbidityHigh: 5.0,
      turbidityMedium: 3.0,
      phLow: 6.5,
      phHigh: 8.5,
      temperatureHigh: 30.0,
      chlorineLow: 0.2
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      alertFrequency: "immediate",
      reportSchedule: "daily"
    },
    system: {
      dataRetention: 365,
      backupFrequency: "daily",
      maintenanceWindow: "02:00-04:00",
      autoReports: true,
      publicDashboard: false
    }
  });

  const roleOptions = [
    "Health Administrator",
    "Disease Specialist", 
    "System Administrator",
    "Health Worker",
    "Data Analyst",
    "Village Coordinator"
  ];

  const villageOptions = [
    "Lake Shore",
    "Mountain View", 
    "Palm Grove",
    "Riverside Village",
    "Green Valley",
    "Multiple",
    "All"
  ];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      status: "Active",
      lastLogin: new Date().toISOString(),
      permissions: getDefaultPermissions(newUser.role)
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "", phone: "", village: "" });
    setIsAddUserModalOpen(false);
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been added to the system.`
    });
  };

  const getDefaultPermissions = (role) => {
    switch (role) {
      case "Health Administrator": return ["View Reports", "Manage Alerts", "Village Management", "User Management"];
      case "Disease Specialist": return ["View Reports", "Health Investigation", "Data Analysis"];
      case "System Administrator": return ["Device Management", "System Configuration", "User Management"];
      case "Health Worker": return ["View Reports", "Basic Alerts"];
      case "Data Analyst": return ["View Reports", "Data Analysis", "Export Data"];
      case "Village Coordinator": return ["View Reports", "Village Management", "Basic Alerts"];
      default: return ["View Reports"];
    }
  };

  const handleUpdateThreshold = (key, value) => {
    setSystemConfig(prev => ({
      ...prev,
      alertThresholds: {
        ...prev.alertThresholds,
        [key]: parseFloat(value)
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully."
    });
  };

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Manage users, configure system parameters, and set notification preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="thresholds">
            <Sliders className="h-4 w-4 mr-2" />
            Alert Thresholds
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            System Config
          </TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts, roles, and permissions
                  </CardDescription>
                </div>
                <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account with appropriate permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">Role *</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="village">Assigned Village</Label>
                          <Select value={newUser.village} onValueChange={(value) => setNewUser(prev => ({ ...prev, village: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select village" />
                            </SelectTrigger>
                            <SelectContent>
                              {villageOptions.map(village => (
                                <SelectItem key={village} value={village}>{village}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={newUser.phone}
                          onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddUser}>Add User</Button>
                        <Button variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.village}</TableCell>
                      <TableCell>
                        <Badge className={`border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Key className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Thresholds Tab */}
        <TabsContent value="thresholds" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sliders className="h-5 w-5 mr-2 text-primary" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>
                Configure water quality parameters that trigger alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Changes to alert thresholds will affect all monitoring devices. Review carefully before saving.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Turbidity */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Turbidity (NTU)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="turbidity-high">High Alert (Critical)</Label>
                      <Input
                        id="turbidity-high"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.turbidityHigh}
                        onChange={(e) => handleUpdateThreshold("turbidityHigh", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="turbidity-medium">Medium Alert (Warning)</Label>
                      <Input
                        id="turbidity-medium"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.turbidityMedium}
                        onChange={(e) => handleUpdateThreshold("turbidityMedium", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* pH */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">pH Level</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ph-low">Low Threshold</Label>
                      <Input
                        id="ph-low"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.phLow}
                        onChange={(e) => handleUpdateThreshold("phLow", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ph-high">High Threshold</Label>
                      <Input
                        id="ph-high"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.phHigh}
                        onChange={(e) => handleUpdateThreshold("phHigh", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Temperature (°C)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temp-high">High Alert Threshold</Label>
                      <Input
                        id="temp-high"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.temperatureHigh}
                        onChange={(e) => handleUpdateThreshold("temperatureHigh", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Chlorine */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Chlorine (mg/L)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="chlorine-low">Low Alert Threshold</Label>
                      <Input
                        id="chlorine-low"
                        type="number"
                        step="0.1"
                        value={systemConfig.alertThresholds.chlorineLow}
                        onChange={(e) => handleUpdateThreshold("chlorineLow", e.target.value)}
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Notification Methods
                </CardTitle>
                <CardDescription>
                  Configure how alerts and updates are delivered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={systemConfig.notifications.emailEnabled}
                    onCheckedChange={(checked) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailEnabled: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={systemConfig.notifications.smsEnabled}
                    onCheckedChange={(checked) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, smsEnabled: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send alerts via push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={systemConfig.notifications.pushEnabled}
                    onCheckedChange={(checked) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushEnabled: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Notification Frequency</CardTitle>
                <CardDescription>
                  Set how often notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="alert-frequency">Alert Frequency</Label>
                  <Select 
                    value={systemConfig.notifications.alertFrequency}
                    onValueChange={(value) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, alertFrequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="every-15min">Every 15 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="report-schedule">Report Schedule</Label>
                  <Select 
                    value={systemConfig.notifications.reportSchedule}
                    onValueChange={(value) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, reportSchedule: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Configuration Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Configure data retention and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="data-retention">Data Retention (days)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    value={systemConfig.system.dataRetention}
                    onChange={(e) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        system: { ...prev.system, dataRetention: parseInt(e.target.value) }
                      }))
                    }
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    How long to keep historical data
                  </p>
                </div>

                <div>
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select 
                    value={systemConfig.system.backupFrequency}
                    onValueChange={(value) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        system: { ...prev.system, backupFrequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maintenance-window">Maintenance Window</Label>
                  <Input
                    id="maintenance-window"
                    value={systemConfig.system.maintenanceWindow}
                    onChange={(e) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        system: { ...prev.system, maintenanceWindow: e.target.value }
                      }))
                    }
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Time window for system maintenance (24h format)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>System Features</CardTitle>
                <CardDescription>
                  Enable or disable system features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-reports">Automatic Reports</Label>
                    <p className="text-sm text-muted-foreground">Generate automated health reports</p>
                  </div>
                  <Switch
                    id="auto-reports"
                    checked={systemConfig.system.autoReports}
                    onCheckedChange={(checked) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        system: { ...prev.system, autoReports: checked }
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-dashboard">Public Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Allow public access to dashboard</p>
                  </div>
                  <Switch
                    id="public-dashboard"
                    checked={systemConfig.system.publicDashboard}
                    onCheckedChange={(checked) => 
                      setSystemConfig(prev => ({
                        ...prev,
                        system: { ...prev.system, publicDashboard: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              System is running optimally. Last backup completed successfully on {new Date().toLocaleDateString()}.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;