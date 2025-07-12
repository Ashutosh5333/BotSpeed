import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Box,
  Switch,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";

import {
  Send as SendIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  AddBoxOutlined as AddBoxOutlinedIcon,
  Movie as MovieIcon,
  AccountCircle as AccountCircleIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from "@mui/icons-material";

// Import components
import BuilderControls from "./components/Builder/BuildersContorls";

import {
  StyledPhoneFooter,
  StyledPhoneFrame,
  StyledPhoneScreen,
} from "./components/Style/Styled";
import PhoneHeader from "./components/Builder/PhoneHeader";
import { SidebarContent } from "./components/Builder/drawerList";
import PostCard from "./components/Builder/PostCard";
import CommentsView from "./components/Builder/CommentsView";
import DirectMessagesView from "./components/Builder/DirectMessagesView";

// --- Reusable Layout Components (Moved here for central definition) ---

function PhoneFrame({ children }) {
  return <StyledPhoneFrame>{children}</StyledPhoneFrame>;
}

function PhoneScreen({ children }) {
  return <StyledPhoneScreen>{children}</StyledPhoneScreen>;
}

function App() {
  const defaultPost = {
    id: "s1",
    id: "s1",
    user: "Zack",
    avatar: "https://via.placeholder.com/60/FF5733/FFFFFF?text=YOU",
    content: "Just posted about my new project! Check it out!",
    image: "https://picsum.photos/id/237/800/600", 
    likes: 3123, // Dummy data for likes
    comments: 245, // Dummy data for comments
    time: "2h",
  };

  // State for managing active section in phone preview
  const [activeSection, setActiveSection] = useState("posts");

  // NEW STATE: To hold the post for which comments are being viewed
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);
  // NEW STATE: To control the visibility of the comments overlay
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);

  // State for creating new posts
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([defaultPost]); // Array to hold all created posts

  // State for comments (used in comments section and potentially on posts)
  const [commentText, setCommentText] = useState("");
  const [currentPostComments, setCurrentPostComments] = useState([]);

  // State for Direct Messages
  const [dmMessage, setDmMessage] = useState("");
  const [dmHistory, setDmHistory] = useState([]);

  // State for creating new stories (distinct from hardcoded samples in BuilderControls)
  const [storyContent, setStoryContent] = useState("");
  const [activeStoryId, setActiveStoryId] = useState(null);

  // State for controlling the visibility of sections in BuilderControls
  const [currentStep, setCurrentStep] = useState(0); // 0: initial, 1: comment, 2: DM, 3: other automations

  // Handler for creating a new post from BuilderControls
  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        user: "botspacehq", // Default user for created posts
        caption: postContent,
        image: "https://placehold.co/280x200/25D366/ffffff?text=WhatsApp+Post", // Default image
        likes: Math.floor(Math.random() * 1000) + 50, // Random likes
        comments: Math.floor(Math.random() * 50) + 5, // Random comments
        time: "Just now",
      };
      setPosts([newPost, ...posts]); // Add new post to the top
      setPostContent(""); // Clear input field
    }
  };

  // Handler for adding a comment (this function is passed to CommentsView)
  const handleAddComment = (commentTextToAdd) => {
    if (commentTextToAdd.trim()) {
      console.log(`Comment "${commentTextToAdd}" added.`);
      // setCurrentPostComments((prevComments) => [...prevComments, newComment]);
      setCommentText(""); // Clear input field
    }
  };

  // Handler for sending a DM
  const handleSendDm = () => {
    if (dmMessage.trim()) {
      setDmHistory([...dmHistory, { text: dmMessage, type: "sent" }]); // Add sent message
      setTimeout(() => {
        setDmHistory((prev) => [
          ...prev,
          { text: "Thanks for your message!", type: "received" }, // Simulate a reply
        ]);
      }, 1000);
      setDmMessage(""); // Clear DM input
    }
  };

  //  
  const [specificCommentWords, setSpecificCommentWords] = useState("");

  const handleAddSpecificWordAsComment = (word) => {
    if (word.trim() && selectedPostForComments) {
      const newGeneratedComment = {
        id: Date.now() + "-generated", // Unique ID for generated comments
        avatarBg: "#8D6E63", // A distinct color for generated comments
        initial: "B", // 'B' for Bot or Builder
        username: "BotComment",
        text: word.trim(),
      };
      console.log(
        `Generated comment "${word}" for post ID: ${selectedPostForComments.id}`
      );
      // Reuse existing comment adder
      setCurrentPostComments((prevComments) => [...prevComments, newGeneratedComment]);
      handleAddComment(word);
    }
  };
  // console.log("specificCommentWords========>",specificCommentWords)

  const handleStoryPreviewClick = (story) => {
    setActiveStoryId(story.id);
    const newPostFromStory = {
      id: Date.now(),
      user: story.user, // Use the story's user as the post user
      caption: `From ${story.user}'s Story: "${story.content}"`, // Include story content in post caption
      image:
        story.image ||
        "https://placehold.co/280x200/cccccc/000000?text=Story+as+Post",
      likes: Math.floor(Math.random() * 100) + 5, // Random likes for a 'new' post
      comments: Math.floor(Math.random() * 20) + 1, // Random comments
      time: "Just now (from story)",
    };
    setPosts([newPostFromStory]);
    setActiveSection("posts");
    console.log(
      `Story "${story.content}" from BuilderControls preview converted to post.`
    );
  };

  // Handler for clicking the "Next" button in BuilderControls
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // MODIFIED HANDLER: When a user wants to view comments for a specific post
  const handleViewCommentsForPost = (post) => {
    setSelectedPostForComments(post);
    setShowCommentsOverlay(true); // Show the comments overlay
    // activeSection remains 'posts' behind the overlay, or 'comments' for builder sync
  };

  // NEW HANDLER: To close the comments overlay
  const handleCloseCommentsOverlay = () => {
    setShowCommentsOverlay(false);
    setSelectedPostForComments(null);
    // activeSection remains what it was before the overlay, or set to 'posts'
    setActiveSection("posts");
  };


  // *** MODIFIED useEffect to synchronize phone preview with builder steps ***
  useEffect(() => {
    switch (currentStep) {
      case 0:
        setActiveSection("posts");
        setSelectedPostForComments(null);
        setShowCommentsOverlay(false); // Ensure overlay is hidden
        break;
      case 1:
        // When builder goes to comments step, if no post is selected, default to the first.
        if (posts.length > 0 && !selectedPostForComments) {
          setSelectedPostForComments(posts[0]);
        }
        setShowCommentsOverlay(true); // Show overlay when builder is on step 1
        setActiveSection("posts"); // Keep activeSection as 'posts' behind the overlay
        break;
      case 2:
        setActiveSection("dm"); // Switch to DM as a full screen view
        setSelectedPostForComments(null);
        setShowCommentsOverlay(false); // Ensure overlay is hidden
        break;
      default:
        break;
    }
  }, [currentStep, posts, selectedPostForComments]);



  // Renders the content displayed inside the phone frame based on activeSection state
  const renderPhoneContent = () => {
    switch (activeSection) {
      case "posts":
        return (
          <>
            <PhoneHeader title="Posts" onBack={() => {}} onMore={() => {}} />
            <PhoneScreen>
              {" "}
              {/* This is the positioned parent for the overlay */}
              {posts.length === 0 ? (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  No posts yet. Create one or click a sample story!
                </Typography>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onViewComments={handleViewCommentsForPost} // Pass the handler to PostCard
                    commentText={commentText}
                    onCommentTextChange={(e) => setCommentText(e.target.value)}
                    onAddComment={handleAddComment}
                  />
                ))
              )}
              {/* Render CommentsView as an overlay *inside* PhoneScreen */}
              {showCommentsOverlay && selectedPostForComments && (
                <CommentsView
                  setActiveSection={setActiveSection} // Still needed for back button in CommentsView header
                  commentText={commentText}
                  setCommentText={setCommentText}
                  post={selectedPostForComments}
                  onAddComment={handleAddComment}
                  onClose={handleCloseCommentsOverlay} // Pass close handler
                  setCurrentPostComments={setCurrentPostComments}
                  currentPostComments={currentPostComments}
                />
              )}
            </PhoneScreen>
          </>
        );
      case "dm": // DM is now a full-screen view again
        return (
          <DirectMessagesView
            setActiveSection={setActiveSection}
            dmMessage={dmMessage}
            setDmMessage={setDmMessage}
            dmHistory={dmHistory}
            handleSendDm={handleSendDm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
     
       <SidebarContent setActiveSection={setActiveSection} />
      {/* Main content area, containing BuilderControls and Phone Preview */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 0,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          overflow: "hidden",
        }}
      >
        {/* ======>   Builder Controls Component  <========= */}

        <BuilderControls
          postContent={postContent}
          onPostContentChange={(e) => setPostContent(e.target.value)}
          onCreatePost={handleCreatePost}
          storyContent={storyContent}
          onStoryContentChange={(e) => setStoryContent(e.target.value)}
          onStoryPreviewClick={handleStoryPreviewClick}
          commentText={commentText}
          onCommentTextChange={(e) => setCommentText(e.target.value)}
          onAddComment={handleAddComment}
          currentStep={currentStep}
          onNextStep={handleNextStep}
          activeStoryId={activeStoryId}
          specificCommentWords={specificCommentWords}
          onSpecificCommentWordsChange={setSpecificCommentWords}
          onAddSpecificWordAsComment={handleAddSpecificWordAsComment}
        />

        {/* ===================>  Phone Preview Area  <==================== */}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            maxHeight: { xs: "50vh", md: "calc(100vh - 100px)" },
          }}
        >
          <PhoneFrame>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              {renderPhoneContent()}
            </Box>
            {/* The existing phone footer: Only show if not in DM or Comments overlay is active */}
            {activeSection !== "dm" && !showCommentsOverlay && (
              <StyledPhoneFooter>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{
                    color: activeSection === "posts" ? "#25D366" : "#b0b0b0",
                  }}
                >
                  <HomeIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <AddBoxOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <MovieIcon />
                </IconButton>
                <IconButton
                  onClick={() => setActiveSection("posts")}
                  sx={{ color: "#b0b0b0" }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </StyledPhoneFooter>
            )}
          </PhoneFrame>

          {/* ==========> Phone Bottom Navigation (Post, Comments, DM buttons) <============ */}

          <Paper
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "300px",
              borderRadius: "12px",
              mt: 1,
              p: 0.5,
              backgroundColor: "#ffffff",
            }}
          >
            <Button
              onClick={() => {
                setActiveSection("posts");
                setSelectedPostForComments(null);
                setShowCommentsOverlay(false);
                setCurrentStep(0);
                // Ensure overlay is hidden
              }}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor:
                  activeSection === "posts" && !showCommentsOverlay
                    ? "#f5f5f5"
                    : "transparent",
                color:
                  activeSection === "posts" && !showCommentsOverlay
                    ? "#000"
                    : "#000",
                "&:hover": {
                  backgroundColor:
                    activeSection === "posts" && !showCommentsOverlay
                      ? "#e0e0e0"
                      : "#e0e0e0",
                },
              }}
            >
              Post
            </Button>
            <Button
              onClick={() => {
                if (posts.length > 0 && !selectedPostForComments) {
                  setSelectedPostForComments(posts[0]);
                }
                setCurrentStep(1);
                setShowCommentsOverlay(true); // Show overlay when Comments button is clicked
                setActiveSection("posts"); // Keep activeSection as 'posts' behind the overlay
              }}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor: showCommentsOverlay
                  ? "#f5f5f5"
                  : "transparent", // Highlight if overlay is active
                color: showCommentsOverlay ? "#000" : "#000",
                "&:hover": {
                  backgroundColor: showCommentsOverlay ? "#e0e0e0" : "#e0e0e0",
                },
              }}
            >
              Comments
            </Button>
            <Button
              onClick={() => {
                setActiveSection("dm"); // Set activeSection to 'dm' for full screen
                setSelectedPostForComments(null);
                setShowCommentsOverlay(false);
                setCurrentStep(3); // Ensure overlay is hidden
              }}
              sx={{
                textTransform: "none",
                flexGrow: 1,
                borderRadius: "8px",
                backgroundColor:
                  activeSection === "dm" ? "#f5f5f5" : "transparent",
                color: activeSection === "dm" ? "#000" : "#000",
                "&:hover": {
                  backgroundColor:
                    activeSection === "dm" ? "#e0e0e0" : "#e0e0e0",
                },
              }}
            >
              DM
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
