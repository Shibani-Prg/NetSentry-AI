
import { useMemo, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

import AdminHeader from "../components/admin/AdminHeader";
import AdminStats from "../components/admin/AdminStats";
import AdminTabs from "../components/admin/AdminTabs";
import AdminFilters from "../components/admin/AdminFilters";
import AdminTable from "../components/admin/AdminTable";

import CreateAdminModal from "../components/admin/CreateAdminModal";
import AdminDetailsModal from "../components/admin/AdminDetailsModal";
import EditAdminModal from "../components/admin/EditAdminModal";
import AdminPasswordModal from "../components/admin/AdminPasswordModal";
import AdminStatusModal from "../components/admin/AdminStatusModal";
import DeleteAdminModal from "../components/admin/DeleteAdminModal";
import AdminConfirmModal from "../components/admin/AdminConfirmModal";

import useAdmins from "../hooks/useAdmins";
import useAdminActions from "../hooks/useAdminActions";

import {
  searchAdmins,
  filterAdminsByRole,
} from "../utils/admin/adminHelpers";

export default function AdminManagement() {
  const { user } = useContext(AuthContext);

  const { admins, loading, error, refetchAdmins } = useAdmins();

  const {
    loading: actionLoading,
    error: actionError,
    success,
    handleCreateAdmin,
    handlePromoteAdmin,
    handleDemoteAdmin,
    handleDeleteAdmin,
    clearMessages,
  } = useAdminActions();

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Filter admins
  const filteredAdmins = useMemo(() => {
    let result = searchAdmins(admins, search);

    if (activeTab === "active") {
      result = result.filter((admin) => admin.is_active);
    } else if (activeTab === "inactive") {
      result = result.filter((admin) => !admin.is_active);
    }

    return filterAdminsByRole(result, roleFilter);
  }, [admins, search, activeTab, roleFilter]);

  // Modal helpers
  const openActionModal = (modalName, admin) => {
    clearMessages();
    setSelectedAdmin(admin);
    setActiveModal(modalName);
  };

  const closeActionModal = () => {
    if (actionLoading) return;

    setActiveModal(null);
    setSelectedAdmin(null);
  };

  const openCreateModal = () => {
    clearMessages();
    setShowCreateModal(true);
  };

  // Create admin
  const handleCreate = async (adminData) => {
    try {
      await handleCreateAdmin(adminData);
      setShowCreateModal(false);
      await refetchAdmins();
    } catch {
      // Error handled by useAdminActions
    }
  };

  // Promote admin
  const handlePromote = async () => {
    if (!selectedAdmin) return;

    try {
      await handlePromoteAdmin(selectedAdmin.id);
      closeActionModal();
      await refetchAdmins();
    } catch {
      // Error handled by useAdminActions
    }
  };

  // Demote Super Admin
  const handleDemote = async () => {
    if (!selectedAdmin) return;

    try {
      await handleDemoteAdmin(selectedAdmin.id);
      closeActionModal();
      await refetchAdmins();
    } catch {
      // Error handled by useAdminActions
    }
  };

  // Delete admin
  const handleDelete = async () => {
    if (!selectedAdmin) return;

    try {
      await handleDeleteAdmin(selectedAdmin.id);
      closeActionModal();
      await refetchAdmins();
    } catch {
      // Error handled by useAdminActions
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#0b1220] p-6">
      <AdminHeader onCreateAdmin={openCreateModal} />

      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {actionError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {actionError}
        </div>
      )}

      <AdminStats admins={admins} />

      <AdminTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AdminFilters
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
      />

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <AdminTable
        admins={filteredAdmins}
        loading={loading}
        currentUser={user}
        onView={(admin) => openActionModal("view", admin)}
        onEdit={(admin) => openActionModal("edit", admin)}
        onPassword={(admin) => openActionModal("password", admin)}
        onStatus={(admin) => openActionModal("status", admin)}
        onDelete={(admin) => openActionModal("delete", admin)}
        onPromote={(admin) => openActionModal("promote", admin)}
        onDemote={(admin) => openActionModal("demote", admin)}
      />

      <CreateAdminModal
        isOpen={showCreateModal}
        onClose={() => {
          if (!actionLoading) setShowCreateModal(false);
        }}
        onSubmit={handleCreate}
        loading={actionLoading}
        error={actionError}
      />

      <AdminDetailsModal
        isOpen={activeModal === "view"}
        onClose={closeActionModal}
        admin={selectedAdmin}
      />

      <EditAdminModal
        isOpen={activeModal === "edit"}
        onClose={closeActionModal}
        admin={selectedAdmin}
      />

      <AdminPasswordModal
        isOpen={activeModal === "password"}
        onClose={closeActionModal}
        admin={selectedAdmin}
      />

      <AdminStatusModal
        isOpen={activeModal === "status"}
        onClose={closeActionModal}
        admin={selectedAdmin}
      />

      <DeleteAdminModal
        isOpen={activeModal === "delete"}
        onClose={closeActionModal}
        admin={selectedAdmin}
        onConfirm={handleDelete}
        loading={actionLoading}
      />

      <AdminConfirmModal
        isOpen={activeModal === "promote" || activeModal === "demote"}
        onClose={closeActionModal}
        admin={selectedAdmin}
        action={activeModal}
        onConfirm={
          activeModal === "promote" ? handlePromote : handleDemote
        }
        loading={actionLoading}
      />
    </div>
  );
}
