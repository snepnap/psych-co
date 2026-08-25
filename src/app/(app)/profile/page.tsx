"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Calendar, Shield,
  Bell, Palette, Lock, Edit, Save, Camera,
  CreditCard, CalendarDays, CheckCircle
} from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const wellnessGoals = [
  { label: "Daily Mood Logging", progress: 85, color: "text-primary" },
  { label: "Weekly Assessment", progress: 60, color: "text-secondary" },
  { label: "Journal Entries (12/month)", progress: 75, color: "text-violet-400" },
  { label: "Therapy Sessions", progress: 50, color: "text-emerald-400" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'purchases'>('profile');
  
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    dob: "",
  });
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError || !authData.session) {
        router.push('/login');
        return;
      }
      
      const uid = authData.session.user.id;
      setUserId(uid);

      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (profileData && !profileError) {
        setForm({
          full_name: profileData.full_name || "",
          email: profileData.email || authData.session.user.email || "",
          phone: profileData.phone || "",
          location: profileData.location || "",
          bio: profileData.bio || "",
          dob: profileData.dob || "",
        });
      } else if (profileError?.code === 'PGRST116') {
        // Profile not found, but we have user email
        setForm(f => ({ ...f, email: authData.session.user.email || "" }));
      }

      // Fetch Bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', uid)
        .order('booking_date', { ascending: false });
      
      if (bookingsData) setBookings(bookingsData);

      // Fetch Purchases
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false });
        
      if (purchasesData) setPurchases(purchasesData);

      setIsLoading(false);
    };

    fetchData();
  }, [supabase, router]);

  const handleSave = async () => {
    if (!userId) return;
    setIsSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        bio: form.bio,
        dob: form.dob || null, // handle empty date
        updated_at: new Date().toISOString()
      });

    setIsSaving(false);
    
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setIsEditing(false);
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    }
  };

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  if (isLoading) {
    return (
      <PageWrapper title="Profile" subtitle="Loading your account...">
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary"
          />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Account" subtitle="Manage your wellness journey">
      <div className="max-w-5xl space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/50">
          <Button 
            variant={activeTab === 'profile' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('profile')}
            className={`rounded-full ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button 
            variant={activeTab === 'bookings' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('bookings')}
            className={`rounded-full ${activeTab === 'bookings' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            My Bookings
          </Button>
          <Button 
            variant={activeTab === 'purchases' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('purchases')}
            className={`rounded-full ${activeTab === 'purchases' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Purchases
          </Button>
        </div>

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-primary/20 via-secondary/10 to-violet-500/10 relative">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 50%, hsl(243,75%,59%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(152,45%,43%) 0%, transparent 50%)"
                  }} />
              </div>
              <CardContent className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-6">
                  <div className="relative w-fit">
                    <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
                      <AvatarImage src="" alt={`${form.full_name} profile photo`} />
                      <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                        {form.full_name ? form.full_name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors duration-150"
                      aria-label="Change profile photo"
                    >
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div>
                        <h2 className="text-xl font-bold font-outfit text-foreground">{form.full_name || 'Anonymous User'}</h2>
                        <p className="text-sm text-muted-foreground">{form.email}</p>
                      </div>
                      <Button
                        id="profile-edit-toggle"
                        variant={isEditing ? "outline" : "default"}
                        size="sm"
                        className={isEditing ? "border-border" : "bg-primary"}
                        onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                      >
                        <Edit className="h-3.5 w-3.5 mr-2" />
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Personal Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Full Name", field: "full_name", icon: User, type: "text", id: "profile-name" },
                    { label: "Email Address", field: "email", icon: Mail, type: "email", id: "profile-email", disabled: true },
                    { label: "Phone Number", field: "phone", icon: Phone, type: "tel", id: "profile-phone" },
                    { label: "Location", field: "location", icon: MapPin, type: "text", id: "profile-location" },
                    { label: "Date of Birth", field: "dob", icon: Calendar, type: "date", id: "profile-dob" },
                  ].map(({ label, field, icon: Icon, type, id, disabled }) => (
                    <div key={field} className="space-y-1.5">
                      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {label}
                      </Label>
                      {isEditing && !disabled ? (
                        <Input
                          id={id}
                          type={type}
                          value={form[field as keyof typeof form]}
                          onChange={(e) => updateField(field, e.target.value)}
                          aria-label={label}
                        />
                      ) : (
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${disabled && isEditing ? 'bg-muted/10 opacity-70' : 'bg-muted/30'}`}>
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                          <span className="text-sm text-foreground">{form[field as keyof typeof form] || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="space-y-1.5">
                    <Label htmlFor="profile-bio" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bio</Label>
                    {isEditing ? (
                      <textarea
                        id="profile-bio"
                        value={form.bio}
                        onChange={(e) => updateField("bio", e.target.value)}
                        className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                        aria-label="Profile bio"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground px-3 py-2 rounded-lg bg-muted/30 leading-relaxed min-h-[40px]">
                        {form.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>

                  {isEditing && (
                    <Button id="profile-save" className="w-full bg-primary" onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white mr-2"
                        />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Preferences Placeholder */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-violet-400" />
                    <CardTitle className="text-base">Preferences</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Email Notifications", id: "pref-email-notif", default: true },
                    { label: "Daily Mood Reminders", id: "pref-mood-reminder", default: true },
                    { label: "Weekly Progress Report", id: "pref-weekly-report", default: false },
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors duration-150">
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Label htmlFor={pref.id} className="text-sm font-medium cursor-pointer">
                          {pref.label}
                        </Label>
                      </div>
                      <input
                        type="checkbox"
                        id={pref.id}
                        defaultChecked={pref.default}
                        className="h-4 w-4 accent-primary rounded cursor-pointer"
                        aria-label={pref.label}
                      />
                    </div>
                  ))}

                  <div className="pt-2 border-t border-border/50">
                    <Button
                      id="profile-change-password"
                      variant="outline"
                      size="sm"
                      className="w-full text-muted-foreground"
                    >
                      <Lock className="h-3.5 w-3.5 mr-2" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Sessions & Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{booking.therapist_name}</p>
                            <p className="text-sm text-muted-foreground">{booking.booking_date} at {booking.booking_time}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' :
                          booking.status === 'cancelled' ? 'bg-red-500/10 text-red-600' :
                          'bg-blue-500/10 text-blue-600'
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">You don't have any past or upcoming bookings.</p>
                    <Button variant="outline" className="mt-4" onClick={() => router.push('/sessions')}>
                      Book a Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'purchases' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Purchase History</CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.length > 0 ? (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold">{purchase.item_name}</p>
                            <p className="text-sm text-muted-foreground">{new Date(purchase.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${purchase.amount}</p>
                          <p className={`text-xs capitalize font-medium ${
                            purchase.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {purchase.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No purchases found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
