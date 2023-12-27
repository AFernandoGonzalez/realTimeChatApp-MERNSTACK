export const AddContactForm = ({ newContactId, setNewContactId, handleAddContact }) => (
    <div className="mt-4">
        <h3>Add Contact</h3>
        <form onSubmit={handleAddContact}>
            <input
                type="text"
                placeholder="Contact User ID"
                value={newContactId}
                onChange={(e) => setNewContactId(e.target.value)}
            />
            <button type="submit">Add Contact</button>
        </form>
    </div>
);
