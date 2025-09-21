import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { MapPin, Camera, Navigation } from "lucide-react";
import Header from "@/components/Header";

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const ReportIssue = () => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const captureLocation = async () => {
    setLoadingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // TODO: Replace with actual reverse geocoding API call
      // For now, simulate address lookup
      const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} - Jharkhand, India`;
      
      setLocation({
        latitude,
        longitude,
        address: mockAddress
      });

      toast({
        title: "Location Captured",
        description: "GPS coordinates and address have been captured successfully",
      });
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to capture location. Please ensure location access is enabled.",
        variant: "destructive",
      });
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > 5) {
      toast({
        title: "Too Many Images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      });
      return;
    }

    // Validate file sizes (max 5MB each)
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast({
        title: "File Size Too Large",
        description: "Each image must be under 5MB",
        variant: "destructive",
      });
      return;
    }

    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(imagePreview[index]);
    
    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please provide a description of the issue",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Missing Location",
        description: "Please capture the GPS location",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Replace with actual API call
      const formData = new FormData();
      formData.append('description', description);
      formData.append('latitude', location.latitude.toString());
      formData.append('longitude', location.longitude.toString());
      formData.append('address', location.address);
      
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI analysis response
      const aiAnalysis = {
        category: "Street Lighting",
        priority: "high",
        possibleDuplicate: false,
        spamRisk: 0.1
      };

      toast({
        title: "Issue Reported Successfully",
        description: `Your issue has been submitted. AI Analysis: ${aiAnalysis.category} - ${aiAnalysis.priority} priority`,
      });

      // TODO: Call AI analysis endpoint
      // await fetch('/ai/analyze', {
      //   method: 'POST',
      //   body: formData
      // });

      navigate("/issues");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to submit your issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Clean up preview URLs on component unmount
  useEffect(() => {
    return () => {
      imagePreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Report Civic Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Issue Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the civic issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload up to 5 images (max 5MB each)
                  </p>
                  
                  {/* Image Previews */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Capture */}
                <div className="space-y-3">
                  <Label>GPS Location *</Label>
                  <Button
                    type="button"
                    onClick={captureLocation}
                    disabled={loadingLocation}
                    variant="outline"
                    className="w-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {loadingLocation ? "Capturing Location..." : "Capture GPS Location"}
                  </Button>
                  
                  {location && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Location Captured</p>
                          <p className="text-sm text-muted-foreground">
                            {location.address}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Lat: {location.latitude.toFixed(6)}, 
                            Lng: {location.longitude.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/issues")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-gov hover:bg-gov-green-light"
                  >
                    {submitting ? "Submitting..." : "Submit Issue"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportIssue;