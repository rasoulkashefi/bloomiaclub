import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
const Home = React.lazy(() => import('./views/home'))
const NotFound = React.lazy(() => import('./views/not-found'))

// Coaching Pages
const Coaching = React.lazy(() => import('./views/coaching'))
const WhatIsCoaching = React.lazy(() => import('./views/what-is-coaching'))
const FreeIntroSession = React.lazy(() => import('./views/free-intro-session'))

// Coaches Pages
const AllCoaches = React.lazy(() => import('./views/all-coaches'))
const CoachProfile = React.lazy(() => import('./views/coach-profile'))
const CoachBio = React.lazy(() => import('./views/coach-bio'))
const CoachExpertise = React.lazy(() => import('./views/coach-expertise'))
const CoachPackages = React.lazy(() => import('./views/coach-packages'))
const CoachEvents = React.lazy(() => import('./views/coach-events'))
const CoachReviews = React.lazy(() => import('./views/coach-reviews'))
const BookSession = React.lazy(() => import('./views/book-session'))

// Events Pages
const AllEvents = React.lazy(() => import('./views/all-events'))
const EventDetail = React.lazy(() => import('./views/event-detail'))

// Other Pages
const Blog = React.lazy(() => import('./views/blog'))
const BlogPost = React.lazy(() => import('./views/blog-post'))
const About = React.lazy(() => import('./views/about'))
const Community = React.lazy(() => import('./views/community'))
const Contact = React.lazy(() => import('./views/contact'))
const FAQ = React.lazy(() => import('./views/faq'))
const Legal = React.lazy(() => import('./views/legal'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="app-loading">در حال بارگذاری...</div>}>
        <Switch>
        {/* Home */}
        <Route component={Home} exact path="/" />

        {/* Coaching */}
        <Route component={Coaching} exact path="/coaching" />
        <Route component={WhatIsCoaching} exact path="/coaching/what-is-coaching" />
        <Route component={FreeIntroSession} exact path="/coaching/free-intro-session" />

        {/* Coaches */}
        <Route component={AllCoaches} exact path="/coaches" />
        <Route component={CoachProfile} exact path="/coaches/:id" />
        <Route component={CoachBio} exact path="/coaches/:id/bio" />
        <Route component={CoachExpertise} exact path="/coaches/:id/expertise" />
        <Route component={CoachPackages} exact path="/coaches/:id/packages" />
        <Route component={CoachEvents} exact path="/coaches/:id/events" />
        <Route component={CoachReviews} exact path="/coaches/:id/reviews" />
        <Route component={BookSession} exact path="/coaches/:id/book-session" />

        {/* Events */}
        <Route component={AllEvents} exact path="/events" />
        <Route component={EventDetail} exact path="/events/:id" />

        {/* Other Pages */}
        <Route component={Blog} exact path="/blog" />
        <Route component={BlogPost} exact path="/blog/:slug" />
        <Route component={About} exact path="/about" />
        <Route component={Community} exact path="/community" />
        <Route component={Contact} exact path="/contact" />
        <Route component={FAQ} exact path="/faq" />
        <Route component={Legal} exact path="/legal" />

        {/* Not Found */}
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
        </Switch>
      </Suspense>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
