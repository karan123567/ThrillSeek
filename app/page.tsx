"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import AdventureGrid from "@/components/AdventureGrid";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import Providers from "@/components/Providers";
import Reviews from "@/components/Reviews";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import NextJSBadge from "@/components/NextJSBadge";
import SearchModal from "@/components/SearchModal";
import ProfileModal from "@/components/ProfileModal";
import ProviderModal from "@/components/ProviderModal";
import ReviewModal from "@/components/ReviewModal";
import DetailModal from "@/components/DetailModal";
import AuthModal from "@/components/auth/AuthModal";
import WishlistModal from "@/components/wishlist/WishlistModal";
import ScrollReveal from "@/components/ScrollReveal";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { adventures } from "@/lib/data";
import { Adventure } from "@/lib/types";
import { useToast } from "@/components/Toast";

export default function Home() {
  const { showToast } = useToast();

  /* ---- modal states ---- */
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  /* ---- filter state ---- */
  const [activeQuickFilter, setActiveQuickFilter] = useState("all");
  const [filtered, setFiltered] = useState<Adventure[]>(adventures);

  const getFiltered = useCallback((): Adventure[] => {
    const loc = (document.getElementById("searchLocation") as HTMLInputElement | null)?.value?.toLowerCase() || "";
    const cat = (document.getElementById("filterCategory") as HTMLSelectElement | null)?.value || "all";
    const diff = (document.getElementById("filterDifficulty") as HTMLSelectElement | null)?.value || "all";
    const maxPrice = parseInt((document.getElementById("filterPrice") as HTMLInputElement | null)?.value || "50000");
    return adventures.filter((a) => {
      if (loc && !a.name.toLowerCase().includes(loc) && !a.location.toLowerCase().includes(loc)) return false;
      if (cat !== "all" && a.category !== cat) return false;
      if (diff !== "all" && a.difficulty !== diff) return false;
      if (a.price > maxPrice) return false;
      if (activeQuickFilter === "trending" && !a.trending) return false;
      if (activeQuickFilter === "top-rated" && !a.topRated) return false;
      if (activeQuickFilter === "budget" && !a.budget) return false;
      if (activeQuickFilter === "new" && !a.isNew) return false;
      return true;
    });
  }, [activeQuickFilter]);

  useEffect(() => {
    setFiltered(getFiltered());
  }, [getFiltered]);

  const handleSort = useCallback(() => {
    const sort = (document.getElementById("sortBy") as HTMLSelectElement | null)?.value || "recommended";
    const list = [...getFiltered()];
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    setFiltered(list);
  }, [getFiltered]);

  const handleReset = useCallback(() => {
    (document.getElementById("searchLocation") as HTMLInputElement).value = "";
    (document.getElementById("filterCategory") as HTMLSelectElement).value = "all";
    (document.getElementById("filterDifficulty") as HTMLSelectElement).value = "all";
    (document.getElementById("filterPrice") as HTMLInputElement).value = "50000";
    (document.getElementById("sortBy") as HTMLSelectElement).value = "recommended";
    document.getElementById("priceLabel")!.textContent = "₹0 – ₹50,000";
    setActiveQuickFilter("all");
    setFiltered(adventures);
    showToast("Filters reset", "info");
  }, [showToast]);

  const updatePriceLabel = () => {
    const v = (document.getElementById("filterPrice") as HTMLInputElement).value;
    document.getElementById("priceLabel")!.textContent = `₹0 – ₹${parseInt(v).toLocaleString()}`;
  };

  const filterByCategory = (cat: string) => {
    (document.getElementById("filterCategory") as HTMLSelectElement).value = cat;
    setActiveQuickFilter("all");
    setTimeout(() => {
      setFiltered(getFiltered());
      document.getElementById("adventures")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const openDetail = (id: number) => {
    setDetailId(id);
    setDetailOpen(true);
  };

  const closeAll = () => {
    setSearchOpen(false);
    setProfileOpen(false);
    setProviderOpen(false);
    setReviewOpen(false);
    setDetailOpen(false);
    setAuthOpen(false);
    setWishlistOpen(false);
  };

  return (
    <>
      <ScrollReveal />
      <KeyboardShortcuts
        onOpenSearch={() => setSearchOpen(true)}
        onCloseAll={closeAll}
      />

      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />
      <Hero />

      <section id="adventures" className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FilterBar
            onFilter={() => setFiltered(getFiltered())}
            onReset={handleReset}
            onUpdatePriceLabel={updatePriceLabel}
            activeQuickFilter={activeQuickFilter}
            onSetQuickFilter={setActiveQuickFilter}
          />
          <AdventureGrid
            adventures={filtered}
            count={filtered.length}
            onOpenDetail={openDetail}
            onSort={handleSort}
          />
        </div>
      </section>

      <Categories
        onFilterByCategory={filterByCategory}
        onNotify={() =>
          showToast("You'll be notified when new categories launch!", "success")
        }
      />
      <HowItWorks />
      <Destinations />
      <Providers />
      <Reviews onOpenReview={() => setReviewOpen(true)} />
      <Stats />
      <CTA />
      <Footer />
      <NextJSBadge />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenDetail={openDetail}
      />
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      <ProviderModal
        isOpen={providerOpen}
        onClose={() => setProviderOpen(false)}
      />
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
      />
      <DetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        adventureId={detailId}
      />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onOpenDetail={openDetail}
      />
    </>
  );
}